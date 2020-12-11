const { getInput } = require('../helper/input')

const getFormattedData = (data, preambleNumber) => ({
  preamble: data.slice(0, preambleNumber).reduce((acc, number) => ({ ...acc, [number]: true }), {}),
  checkedList: data.slice(preambleNumber)
})

const canSumByTwoNumber = (preamble, checkedNumber) => {
  for (number of Object.keys(preamble)) {
    if (preamble[checkedNumber - number] && (number * 2) != checkedNumber) {
      return true
    }
  }
  return false
}
const findInvalidNumber = (checkedList, preamble) => {
  if (checkedList.length === 0) return false
  const checkedNumber = checkedList[0]
  if (canSumByTwoNumber(preamble, checkedNumber)) {
    return findInvalidNumber(checkedList.slice(1), { ...preamble, [checkedNumber]: true })
  } else {
    return checkedNumber
  }
}

const solve1 = data => findInvalidNumber(data.checkedList, data.preamble)

const sum = (data) => data.reduce((acc, item) => acc + item, 0)

// Big O (N * N)
const solve2 = (data, targetedNumber) => {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const targetedArray = data.slice(i, j)
      if (sum(targetedArray) == targetedNumber) {
        return Math.min(...targetedArray) + Math.max(...targetedArray)
      }
    }
  }
}

// Big O(N) only for positive number
const solvePositive2 = (data, targetNumber) => {
  let left = 0
  let right = 0
  let sum = 0
  while (left !== data.length - 1 && right < data.length) {
    if (sum === targetNumber) {
      const targetedArray = data.slice(left, right)
      return Math.min(...targetedArray) + Math.max(...targetedArray)
    }
    else if (sum > targetNumber) {
      sum -= data[left]
      left++
    }
    else {
      sum += data[right]
      right++
    }
  }
}

const main = async () => {
  const data = await getInput()
  const numberData = data.map(item => parseInt(item))
  const formattedData = getFormattedData(numberData, 25)
  const result1 = solve1(formattedData)
  console.log(result1)
  console.log(solvePositive2(numberData, result1))
}

main().then(() => { })