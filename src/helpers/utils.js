import { parseISO, format } from 'date-fns'
import th from 'date-fns/locale/th'
import axios from 'axios'

function getSysDate() {
  const today = new Date()
  const year = today.getFullYear() + 543
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

function formatYYYYMMDD(date) {
  if (date) {
    const [day, month, year] = date.split('/')
    return `${year}${month}${day}`
  }
}

function formatDateToDDMMYYYY(date) {
  let data = date.toString().padEnd(8, '0')
  let [year, month, day] = [
    data.substring(0, 4),
    data.substring(4, 6),
    data.substring(6)
  ]
  return `${day}/${month}/${year}`
}

function formatDateToYYYYMMDD(date) {
  let data = date.toString().padEnd(8, '0')
  let [day, month, year] = [
    data.substring(0, 2),
    data.substring(2, 4),
    data.substring(4, 8)
  ]
  return `${year}${month}${day}`
}

function convertThaiDate(inputDate) {
  // Parse the input date string in ISO format (YYYYMMDD)
  const parsedDate = parseISO(inputDate)

  // Format the date in the desired Thai date format
  const thaiDate = format(parsedDate, 'd MMMM yyyy', {
    locale: th,
  })

  return thaiDate
}

async function redirectToLoginPage() {
  await axios.get(`/api/auth/logout`)
  window.location.href = 'https://iservice.dopa.go.th'
}

function mapDataObject(source, target) {
  // console.log('source :>> ', source)
  // console.log('target :>> ', target)
  Object.keys(source)
    .filter(key => key in target)
    .forEach(key => target[key] = source[key])
  return target
}

function setDataToStore(data, store) {
  console.log('data :>> ', data)
  console.log('store :>> ', store)
}

function formatDocumentId(docId) {
  if (!docId || docId === '0') return ''
  const docString = typeof docId === 'string' ? docId : docId.toString()
  const year = docString.slice(0, 4)
  const id = Number(docString.slice(4, 12))
  return `${id}/${year}`
}

function formatStringToNumber(value) {
  if (!value && typeof value !== 'string') return 0
  return Number(value.toString().replace(/-/g, ''))
}

function formatStringToNumberNoInt(value) {
  if (!value && typeof value !== 'string') return 0
  return value.toString().replace(/-/g, '')
}

function formatDateToYYMMDD(date) {
  if (!date || typeof date !== 'string') return date
  const [day, month, year] = date.split('/')
  return Number(`${year}${month}${day}`)
}

function formatDateSlash(date) {
  if (!date) return date
  const dateString = typeof date === 'string' ? date : date.toString()

  if (dateString.length !== 8) {
    throw new Error('Expected format: YYYYMMDD', dateString)
  }

  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)

  return `${day}/${month}/${year}`
}


function convertStringToNumber(value) {
  return (!value && typeof value !== 'string') ? value : Number(value.replace(/-/g, ''))
}

function convertToThaiDate(inputDate) {
  const isoDate = `${inputDate.substring(0, 4)}-${inputDate.substring(4, 6)}-${inputDate.substring(6)}`
  return format(parseISO(isoDate), 'd MMMM yyyy', { locale: th })
}

function formatDateThaiMonth(date) {
  let data = date.toString().padEnd(8, '0')
  let [year, month, day] = [
    data.substring(0, 4),
    data.substring(4, 6),
    data.substring(6)
  ]
  if (Number(month) == 0) {
    month = '-'
  } else {
    month = getThaiMonth(parseInt(month)).desc
  }
  return `${day} ${month} ${year}`
}

function getThaiMonth(month) {
  let thaiMonths = [
    {
      code: 0,
      desc: ''
    },
    {
      code: 1,
      desc: 'มกราคม'
    },
    {
      code: 2,
      desc: 'กุมภาพันธ์'
    },
    {
      code: 3,
      desc: 'มีนาคม'
    },
    {
      code: 4,
      desc: 'เมษายน'
    },
    {
      code: 5,
      desc: 'พฤษภาคม'
    },
    {
      code: 6,
      desc: 'มิถุนายน'
    },
    {
      code: 7,
      desc: 'กรกฎาคม'
    },
    {
      code: 8,
      desc: 'สิงหาคม'
    },
    {
      code: 9,
      desc: 'กันยายน'
    },
    {
      code: 10,
      desc: 'ตุลาคม'
    },
    {
      code: 11,
      desc: 'พฤศจิกายน'
    },
    {
      code: 12,
      desc: 'ธันวาคม'
    }
  ]
  return thaiMonths[month]
}

function formatDateToDisplay(date) {
  if (date == 0) return ''
  if (date == '-') return '-'
  let data = date.toString().padEnd(8, '0')
  let [year, month, day] = [data.substring(0, 4), data.substring(4, 6), data.substring(6)]
  if (Number(month) == 0) {
    month = '-'
  } else {
    month = getThaiMonth(parseInt(month)).desc
  }
  if (Number(day) == 0) {
    day = '-'
  } else {
    day = parseInt(day)
  }
  return `${day} ${month} พ.ศ. ${year}`
}

function formatDateToDisplayWiththaiNumber(date) {
  if (date == 0) return ''
  if (date == '-') return '-'
  let data = date.toString().padEnd(8, '0')
  let [year, month, day] = [data.substring(0, 4), data.substring(4, 6), data.substring(6)]
  if (Number(month) == 0) {
    month = '-'
  } else {
    month = getThaiMonth(parseInt(month)).desc
  }
  if (Number(day) == 0) {
    day = '-'
  } else {
    day = parseInt(day)
  }
  return `${formatNumberToThai(day)} ${month} พ.ศ. ${formatNumberToThai(year)}`
}

function formatNumberToThai(number) {
  number = number.toString()
  let chars = {
    0: '๐',
    1: '๑',
    2: '๒',
    3: '๓',
    4: '๔',
    5: '๕',
    6: '๖',
    7: '๗',
    8: '๘',
    9: '๙'
  }
  return number.replace(/[1234567890]/g, (m) => chars[m])
}

function foramtDateString(v, noslad) {
  if (v && noslad) {
    let data = v.toString().padEnd(8, '0')
    let [year, month, day] = [
      data.substring(0, 4),
      data.substring(4, 6),
      data.substring(6)
    ]
    return ` ${Number(day)} ${getThaiMonth(Number(month)).desc} พ.ศ. ${year}`
  }
  if (v) {
    const [day, month, year] = v.split('/')
    return ` ${Number(day)} ${getThaiMonth(Number(month)).desc} พ.ศ. ${year}`
  }
}

function array(array, what, v) {
  return array.find((item) => item[what] == v)
}

export {
  getSysDate,
  formatYYYYMMDD,
  convertThaiDate,
  redirectToLoginPage,
  formatDateToDDMMYYYY,
  mapDataObject,
  formatDateToYYYYMMDD,
  setDataToStore,
  formatDocumentId,
  formatStringToNumber,
  formatStringToNumberNoInt,
  formatDateToYYMMDD,
  formatDateSlash,
  convertStringToNumber,
  convertToThaiDate,
  getThaiMonth,
  formatDateThaiMonth,
  formatDateToDisplay,
  formatNumberToThai,
  formatDateToDisplayWiththaiNumber,
  foramtDateString,
  array
}

