const { getInput } = require('../helper/input')

// First question
const getNumber = (str) => {
  let numStr = ''
  let i = 0;
  for (i; i < str.length && isNaN(str[i]); i++) { }
  numStr += str[i]
  for (i = str.length - 1; i >= 0 && isNaN(str[i]); i--) { }
  numStr += str[i]
  return parseInt(numStr, 10)
}

const numStr = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
]
// Second question
const getNumberFromStr = (str) => {
  const regex = new RegExp(`${numStr.join('|')}|\\d`, 'g')
  const result = str.match(regex)
  const first = result[0]
  const firstNumber = isNaN(first) ? numStr.findIndex(i => i == first) : parseInt(first, 10)
  const last = result[result.length - 1]
  const lastNumber = isNaN(last) ? numStr.findIndex(i => i == last) : parseInt(last, 10)

  const number = firstNumber * 10 + lastNumber
  return number

}
const main = async () => {
  const data = await getInput()
  const result1 = data.reduce((acc, i) => acc + getNumber(i), 0)
  const result2 = data.reduce((acc, i) => acc + getNumberFromStr(i), 0)
  console.log(result1, result2)
}

main().then(() => { })
