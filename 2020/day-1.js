const getFormattedData = (data) => data.reduce((acc, year) => ({ ...acc, [year]: year }), {})

const get2ProductYear = (data, targetYear = 2020) => {
  const formattedData = getFormattedData(data)
  for (let year of data) {
    if (formattedData[targetYear - year]) {
      return (targetYear - year) * year
    }
  }
  return false
}



const get3ProductFromYear = (data, targetYear = 2020) => {
  const formattedData = getFormattedData(data)
}

console.log(get2ProductYear(data))
