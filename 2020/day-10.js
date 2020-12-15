const { getInput, zip, sort, zip3 } = require('../helper/input')

const getFormattedData = (data) => data.map(item => parseInt(item))

const solve1 = (jolts) => {
  const sortedJolts = sort([0, ...jolts])
  const pairedJolts = zip(sortedJolts.slice(0, -1), sortedJolts.slice(1))
  return pairedJolts.reduce((acc, [left, right]) => ({ ...acc, [right - left]: acc[right - left] + 1 }), { '1': 0, '3': 1, '2': 0 })
}

const getFactorial = n => {
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

const getCombination = (n, k) => getFactorial(n) / (getFactorial(k) * getFactorial(n - k))

const evaluateSumOfSerial = (n) => Math.pow(2, n) - 1

const solve2 = jolts => {
  const sortedJolts = sort([0, ...jolts])
  const pairedJolts = zip3(sortedJolts.slice(0, -2), sortedJolts.slice(1), sortedJolts.slice(2))
  const removedArr = pairedJolts.reduce((acc, [left, middle, right]) => {
    if ((left + 1) == middle && middle == (right - 1)) {
      return [...acc, middle]
    }
    return acc
  }, [])
  console.log(removedArr)

  // console.log(">COunt", count)
  const count = removedArr.length
  let result = 0;
  // for (let i = 1; i <= count; i++) {
  //   result += getCombination(count, i)
  // }
  return evaluateSumOfSerial(count) - 2 * evaluateSumOfSerial(count - 3)
}

const main = async () => {
  const data = await getInput()
  const formattedData = getFormattedData(data)
  const result1 = solve1(formattedData)
  console.log(result1['1'] * result1['3'])
  console.log(solve2(formattedData))
  // console.log(getCombination(5, 2))
}

main().then(() => { })