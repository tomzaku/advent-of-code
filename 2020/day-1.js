const { getInput } = require('../helper/input')
const getHashData = (data) => data.reduce((acc, year) => ({ ...acc, [year]: year }), {})

const get2ProductYear = (data, targetYear = 2020) => {
  const formattedData = getHashData(data)
  for (let year of data) {
    if (formattedData[targetYear - year]) {
      return (targetYear - year) * year
    }
  }
  return false
}

const get3ProductFromYear = (data, targetYear = 2020) => {
  const formattedData = getHashData(data)
  for (let firstIndex = 0; firstIndex < data.length - 1; firstIndex++) {
    for (let secondIndex = firstIndex + 1; secondIndex < data.length; secondIndex++) {
      const firstYear = data[firstIndex]
      const secondYear = data[secondIndex]
      if (formattedData[targetYear - firstYear - secondYear]) {
        return firstYear * secondYear * (targetYear - firstYear - secondYear)
      }
    }
  }
  return false
}

const main = async () => {
  const data = await getInput()
  const years = data.map(item => parseInt(item))
  console.log(get2ProductYear(years))
  console.log(get3ProductFromYear(years))
}

main().then(() => { })