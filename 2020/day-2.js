const { getInput } = require('../helper/input')

// Using XOR
const getValidCountPasswordLength = (passwords) => {
  return passwords.filter(
    ({ rawPassword, begin, end, key }) => {
      return (rawPassword[begin - 1] === key) ^ (rawPassword[end - 1] === key)
    }
  ).length
}

const getValidPositionPasswordLength = (passwords) => {
  return passwords.filter(
    ({ rawPassword, begin, end, key }) => {
      const countKeys = rawPassword.split('').filter(char => char === key).length
      return begin <= countKeys && countKeys <= end
    }
  ).length
}

const main = async () => {
  const data = await getInput()
  const passwords = data.map((line) => {
    const match = line.match(/(\d+)-(\d+) (.): (.+)/)
    return {
      begin: parseInt(match[1]),
      end: parseInt(match[2]),
      key: match[3],
      rawPassword: match[4]
    }
  })
  console.log(getValidPositionPasswordLength(passwords))
  console.log(getValidCountPasswordLength(passwords))
}

main().then(() => { })