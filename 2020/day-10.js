const { getInput, zip, sort, zip3 } = require('../helper/input')

const getFormattedData = (data) => data.map(item => parseInt(item))

const solve1 = (jolts) => {
  const sortedJolts = sort([0, ...jolts])
  const pairedJolts = zip(sortedJolts.slice(0, -1), sortedJolts.slice(1))
  return pairedJolts.reduce((acc, [left, right]) => ({ ...acc, [right - left]: acc[right - left] + 1 }), { '1': 0, '3': 1, '2': 0 })
}


const main = async () => {
  const data = await getInput()
  const formattedData = getFormattedData(data)
  const result1 = solve1(formattedData)
  console.log(result1['1'] * result1['3'])
  // console.log(solve2(formattedData))
}

main().then(() => { })