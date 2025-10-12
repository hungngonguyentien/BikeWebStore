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
    // ch = current character
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
  console.log(field);
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
  const firstLine = csvText.split(/\r?\n/)[0] || '' //Get first line safely
  const commaCount = (firstLine.match(/,/g) || []).length 
  const tabCount = (firstLine.match(/\t/g) || []).length
  const delimiter = tabCount > commaCount ? '\t' : ',' // Detect delimiter

  const rows = csvToArray(csvText, delimiter).filter(r => r.length > 0 && r.some(cell => cell !== '')) // Break into rows, remove empty rows
  
  if (rows.length === 0) return []

  const rawHeaders = rows[0].map(h => (h || '').toLowerCase().trim()) // header row, make it lowercase for matching. Eg: "Model" -> "model"

  const normalize = s => (s || '').toLowerCase().replace(/[\s_.]/g, '')

  //Find index function for multiple possible header names
  const findIndex = (candidates) => {
    for (const cand of candidates) {
      const idx = rawHeaders.findIndex(h => normalize(h) === normalize(cand))
      if (idx !== -1) return idx
    }
    return -1
  } 

  // Find relevant columns 
  const nameIdx = findIndex(['name', 'model'])
  const priceIdx = findIndex(['price', 'cost'])
  const imageIdx = findIndex(['imageurl', 'image url', 'image', 'image_url'])
  const manuIdx = findIndex(['manufacturer', 'maker', 'brand'])
  const versionIdx = findIndex(['version or years', 'version', 'years', 'year'])
  const descIdx = findIndex(['short description', 'description', 'desc'])
  const colorsIdx = findIndex(['colors', 'color'])
  const moreImg1Idx = findIndex(['more image 1', 'moreimage1', 'image1'])
  const moreImg2Idx = findIndex(['more image 2', 'moreimage2', 'image2'])
  const moreImg3Idx = findIndex(['more image 3', 'moreimage3', 'image3'])
  const moreImg4Idx = findIndex(['more image 4', 'moreimage4', 'image4'])
  const moreImg5Idx = findIndex(['more image 5', 'moreimage5', 'image5'])
  const rangeIdx = findIndex(['range', 'distance'])
  const chargeTimeIdx = findIndex(['charge time', 'chargetime', 'charging time'])
  const maxSpeedIdx = findIndex(['max speed', 'maxspeed', 'top speed'])
  const trunkWidthIdx = findIndex(['trunk width', 'trunkwidth', 'storage'])
  const warrantyIdx = findIndex(['warranty', 'bao hanh'])
  const engineIdx = findIndex(['engine', 'motor', 'dong co'])
  const batteryIdx = findIndex(['battery', 'pin', 'acquy'])
  const brakeIdx = findIndex(['brake', 'phanh'])
  const frameIdx = findIndex(['frame and fork', 'frame', 'khung xe'])
  const sizeIdx = findIndex(['size', 'dimensions', 'kich thuoc'])
  const weightIdx = findIndex(['weight', 'trong luong', 'kg'])

  // Map rows to bike objects
  const bikes = rows.slice(1).map((cells, i) => { // slice(1) to skip header row
    const name = (nameIdx !== -1 ? cells[nameIdx] : cells[0]) || '' // name = first column if no header found
    if (!name || name.trim().length === 0) return null // skip rows without a name/model

    return {
      id: i + 1,
      name: name.trim(),
      price: (priceIdx !== -1 ? cells[priceIdx] : '').trim(),
      imageURL: (imageIdx !== -1 ? cells[imageIdx] : '').trim(),
      manufacturer: (manuIdx !== -1 ? cells[manuIdx] : (cells[3] || '')).trim(),
      version: (versionIdx !== -1 ? cells[versionIdx] : '').trim(),
      shortDescription: (descIdx !== -1 ? cells[descIdx] : '').trim(),
      colors: (colorsIdx !== -1 ? cells[colorsIdx] : '').trim(),
      moreImages: [
        (moreImg1Idx !== -1 ? cells[moreImg1Idx] : '').trim(),
        (moreImg2Idx !== -1 ? cells[moreImg2Idx] : '').trim(),
        (moreImg3Idx !== -1 ? cells[moreImg3Idx] : '').trim(),
        (moreImg4Idx !== -1 ? cells[moreImg4Idx] : '').trim(),
        (moreImg5Idx !== -1 ? cells[moreImg5Idx] : '').trim()
      ].filter(img => img !== ''),
      specifications: {
        range: (rangeIdx !== -1 ? cells[rangeIdx] : '').trim(),
        chargeTime: (chargeTimeIdx !== -1 ? cells[chargeTimeIdx] : '').trim(),
        maxSpeed: (maxSpeedIdx !== -1 ? cells[maxSpeedIdx] : '').trim(),
        trunkWidth: (trunkWidthIdx !== -1 ? cells[trunkWidthIdx] : '').trim(),
        warranty: (warrantyIdx !== -1 ? cells[warrantyIdx] : '').trim(),
        engine: (engineIdx !== -1 ? cells[engineIdx] : '').trim(),
        battery: (batteryIdx !== -1 ? cells[batteryIdx] : '').trim(),
        brake: (brakeIdx !== -1 ? cells[brakeIdx] : '').trim(),
        frame: (frameIdx !== -1 ? cells[frameIdx] : '').trim(),
        size: (sizeIdx !== -1 ? cells[sizeIdx] : '').trim(),
        weight: (weightIdx !== -1 ? cells[weightIdx] : '').trim()
      }
    }
  }).filter(Boolean)
  console.log(bikes)
  return bikes
}

/**
 * Fetch helper (unchanged mostly)
 */
export const fetchBikesFromSheets = async (shareUrl) => {
  try {
    // convert share URL to CSV export URL, then fetch to get CSV text
    const csvUrl = getCSVUrl(shareUrl)
    const res = await fetch(csvUrl, { mode: 'cors', headers: { 'Accept': 'text/csv' } })
    const text = await res.text()


    // debug: if you get HTML back (login page), you'll see "<!DOCTYPE html>"
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
