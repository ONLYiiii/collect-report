const funcs = {
  formatDateTh(date) {
    if (date) {
      let data = date.toString().padEnd(8, '0').replaceAll('/', '')
      let [day, month, year] = [
        data.substring(0, 2),
        data.substring(2, 4),
        data.substring(4, 8),
      ]
      if (month == '01') {
        month = 'มกราคม'
      } else if (month == '02') {
        month = 'กุมภาพันธ์'
      } else if (month == '03') {
        month = 'มีนาคม'
      } else if (month == '04') {
        month = 'เมษายน'
      } else if (month == '05') {
        month = 'พฤษภาคม'
      } else if (month == '06') {
        month = 'มิถุนายน'
      } else if (month == '07') {
        month = 'กรกฎาคม'
      } else if (month == '08') {
        month = 'สิงหาคม'
      } else if (month == '09') {
        month = 'กันยายน'
      } else if (month == '10') {
        month = 'ตุลาคม'
      } else if (month == '11') {
        month = 'พฤศจิกายน'
      } else if (month == '12') {
        month = 'ธันวาคม'
      }
      return Number(day) + ' ' + month + ' พ.ศ. ' + year
    }
  },
  getFullName(title, firstName, middleName, lastName, titleDesc2) {
    let fullname = title + firstName
    if (middleName != '') {
      fullname += ' ' + middleName
    }
    fullname += ' ' + lastName
    if (titleDesc2 != '') {
      fullname += ' ' + titleDesc2
    }
    return fullname
  },
  formatPid(value) {
    if (!value) return '-'

    if (value) {
      let data = value.toString().padEnd(13, '0')
      let [a, b, c, d, e] = [
        data.substring(0, 1),
        data.substring(1, 5),
        data.substring(5, 10),
        data.substring(10, 12),
        data.substring(12, 13)
      ]
      return a + '-' + b + '-' + c + '-' + d + '-' + e
    }
  },
  formatDateToDisplayslash(date) {
    if (date == 0) return ''
    if (date == '-') return '-'
    let data = date.toString().padEnd(8, '0')
    let [year, month, day] = [data.substring(0, 4), data.substring(4, 6), data.substring(6)]
    if (Number(month) == 0) {
      month = '-'
    }
    if (Number(day) == 0) {
      day = '-'
    }
    return `${day}/${month}/${year}`
  },
  formatDateYYMMDD(date) {
    if (date == 0) return ''
    if (date == '-') return '-'
    let data = date.toString().padEnd(8, '0')
    let [day, month, year] = [data.substring(0, 2), data.substring(2, 4), data.substring(4, 8)]
    return `${year}${month}${day}`
  },
  formatRqSubReg(items) {
    if (items.rq_subreg === '11') {
      return 'ร.1 ขออนุญาตจัดให้มีการเรี่ยไร มาตรา 6'
    } else if (items.rq_subreg === '12') {
      return 'ร.1 ขออนุญาตจัดให้มีการเรี่ยไร มาตรา 8'
    } else if (items.rq_subreg === '21') {
      return 'ร.2 ขออนุญาตจัดให้มีการเรี่ยไร มาตรา 6'
    } else if (items.rq_subreg === '22') {
      return 'ร.2 ขออนุญาตจัดให้มีการเรี่ยไร มาตรา 8'
    }

  }



}
export default funcs
