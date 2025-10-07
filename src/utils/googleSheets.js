// utils/sheets.js

export const getCSVUrl = (shareUrl) => {
  const idMatch = shareUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  if (!idMatch) throw new Error('Invalid Google Sheets URL')
  const id = idMatch[1]
  // prefer gid if present in the share link
  const gidMatch = shareUrl.match(/[&#]gid=(\d+)/)
  const gidPart = gidMatch ? `&gid=${gidMatch[1]}` : ''
  // Two possible endpoints that often work: export?format=csv or gviz/tq?out:csv
  // gviz sometimes behaves better for direct CSV downloads from the browser.
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv${gidPart}`
}

/**
 * Robust CSV -> 2D array parser (handles quoted fields, escaped quotes, newlines inside quotes)
 * @param {string} text
 * @param {string} delimiter
 * @returns {Array<Array<string>>}
 */
const csvToArray = (text, delimiter = ',') => {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]

    // Quote handling (supports escaped quotes by doubling "")
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"'
        i++ // skip the escaped quote
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    // Delimiter outside quotes
    if (ch === delimiter && !inQuotes) {
      row.push(field)
      field = ''
      continue
    }

    // Newline outside quotes => finish row
    if (ch === '\n' && !inQuotes) {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      continue
    }

    // ignore CR (handled by skipping \r)
    if (ch === '\r') continue

    field += ch
  }

  // push last field/row (if any)
  // if file ends with newline, last row will be an empty array; handle that.
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.map(r => r.map(c => c.trim()))
}

/**
 * Parse CSV text to bike objects
 * - auto-detects delimiter (comma vs tab)
 * - finds header columns robustly
 */
export const parseCSVToBikes = (csvText) => {
  if (!csvText || !csvText.trim()) return []

  // detect delimiter by counting in header line
  const firstLine = csvText.split(/\r?\n/)[0] || ''
  const commaCount = (firstLine.match(/,/g) || []).length
  const tabCount = (firstLine.match(/\t/g) || []).length
  const delimiter = tabCount > commaCount ? '\t' : ','

  const rows = csvToArray(csvText, delimiter).filter(r => r.length > 0 && r.some(cell => cell !== ''))
  if (rows.length === 0) return []

  const rawHeaders = rows[0].map(h => (h || '').toLowerCase().trim())

  const normalize = s => (s || '').toLowerCase().replace(/[\s_.]/g, '')

  const findIndex = (candidates) => {
    for (const cand of candidates) {
      const idx = rawHeaders.findIndex(h => normalize(h) === normalize(cand))
      if (idx !== -1) return idx
    }
    return -1
  }

  const nameIdx = findIndex(['name', 'model'])
  const priceIdx = findIndex(['price', 'cost'])
  const imageIdx = findIndex(['imageurl', 'image url', 'image', 'image_url', 'imageurl'])
  const manuIdx = findIndex(['manufacturer', 'maker', 'brand'])

  const bikes = rows.slice(1).map((cells, i) => {
    const name = (nameIdx !== -1 ? cells[nameIdx] : cells[0]) || ''
    if (!name || name.trim().length === 0) return null

    const price = (priceIdx !== -1 ? cells[priceIdx] : '') || ''
    const imageURL = (imageIdx !== -1 ? cells[imageIdx] : '') || 'https://via.placeholder.com/300x200?text=No+Image'
    const manufacturer = (manuIdx !== -1 ? cells[manuIdx] : (cells[3] || '')) || ''

    return {
      id: i + 1,
      name: name.trim(),
      price: price.trim(),
      imageURL: imageURL.trim(),
      manufacturer: manufacturer.trim()
    }
  }).filter(Boolean)

  return bikes
}

/**
 * Fetch helper (unchanged mostly)
 */
export const fetchBikesFromSheets = async (shareUrl) => {
  try {
    const csvUrl = getCSVUrl(shareUrl)
    const res = await fetch(csvUrl, { mode: 'cors', headers: { 'Accept': 'text/csv' } })

    // debug: if you get HTML back (login page), you'll see "<!DOCTYPE html>"
    const text = await res.text()
    if (!res.ok) {
      console.error('Fetch failed, response not OK:', res.status, text.slice(0, 300))
      throw new Error(`HTTP ${res.status}`)
    }

    // simple sanity check: if the response looks like HTML, throw so you can debug access/CORS
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error('Google returned HTML instead of CSV — sheet might not be public or endpoint blocked. First 300 chars:', text.slice(0, 300))
      throw new Error('Unexpected HTML response (check share settings / CORS)')
    }

    return parseCSVToBikes(text)
  } catch (err) {
    console.error('Error fetching/parsing sheet:', err)
    throw err
  }
}
