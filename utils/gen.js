const createDate = () => {
  const d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
  return `${formatDateItem(year)}-${formatDateItem(month)}-${formatDateItem(day)}`
}

const formatDateItem = (num) => {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

module.exports.createDate = createDate
