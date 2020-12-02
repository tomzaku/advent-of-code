const { getInput } = require('../helper/input')
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

const main = async () => {
  const data = await getInput()
  const years = data.map(item => parseInt(item))
  console.log(get2ProductYear(years))
  console.log(get3ProductFromYear(years))
}

main().then(() => { })