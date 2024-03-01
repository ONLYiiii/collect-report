function formatLicid(num) {
  let newLastId = ''
  if (num !== 0) {
    let year = String(num).substring(0, 4)
    let id = String(num).substring(4, 12)
    // let newLastId = ''
    for (let i in String(id)) {
      if (id[i] != '0') {
        id = String(id).substring(i, 12)
        newLastId = id + '/' + year
        break
      } else if (i == id.length - 1 && id[i] == '0') {
        newLastId = '-'
        break
      } else {
        continue
      }
    }
    return newLastId
  } else {
    return (newLastId = '-')
  }
}

function revertFormatLicid(rqId1, rqId2) {
  const zero = '0'.repeat(8 - Number(String(rqId1).length))
  return `${rqId2}${zero}${rqId1}`
}

export { formatLicid, revertFormatLicid }
