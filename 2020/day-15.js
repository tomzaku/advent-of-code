const { getInput, zip, sort, zip3, makeGroup, sum, transpose, all, omit, merge, findAllIndex } = require('../helper/input')

const solve1 = (numbers = [], targetIndex) => {
  const length = numbers.length
  const lastNumber = numbers[length - 1]
  if (length == targetIndex) return lastNumber
  const recentNumberIndexes = findAllIndex(numbers)(i => i == lastNumber).slice(-2)
  if (recentNumberIndexes.length === 1) return solve1([...numbers, 0], targetIndex)
  return solve1([...numbers, recentNumberIndexes[1] - recentNumberIndexes[0]], targetIndex)
}

const solve2 = (numbers = [], targetIndex) => {
  let numberMap = new Map()
  numbers.forEach((number, index) => numberMap.set(number, [index]))
  let lastNumber = numbers[numbers.length - 1]
  for (let i = numbers.length; i < targetIndex; i++) {
    const numberIndexes = numberMap.get(lastNumber)
    let currentNumber;
    if (numberIndexes.length == 1) {
      currentNumber = 0
    } else {
      currentNumber = numberIndexes[0] - numberIndexes[1]
    }
    const currentIndex = numberMap.get(currentNumber)
    if (currentIndex) {
      numberMap.set(currentNumber, [i, currentIndex[0]])
    } else {
      numberMap.set(currentNumber, [i])
    }
    lastNumber = currentNumber
  }
  return lastNumber
}

const main = async () => {
  console.log(solve1([6, 3, 15, 13, 1, 0], 2020))
  console.log(solve2([6, 3, 15, 13, 1, 0], 30000000))
}

main().then(() => { })