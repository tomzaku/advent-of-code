const { getInput } = require('../helper/input')

const makeGroup = (data) => (ifMatch) => {
  const result = []
  let temp = []
  data.forEach((item) => {
    if (ifMatch(item)) {
      result.push(temp)
      temp = []
    } else {
      temp.push(item)
    }
  })
  return result
}

const getPersonData = (data) => {
  return data.join(' ').split(' ').reduce((acc, field) => ({ ...acc, [field.split(':')[0]]: field.split(':')[1] }), {})
}

const getFormattedData = data => {
  const groupedData = makeGroup(data)(item => item == '')
  return groupedData.map((item) => getPersonData(item))
}

// ==================================
const checkValidPerson = person =>
  (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].filter(key => person[key] != undefined).length) === 7

const solve1 = (data) => {
  return data.filter((person) => checkValidPerson(person)).length
}


// ====================================
// Not using regrex
const isHexValid = (hex) => hex[0] == '#' && (hex.split('').slice(1).filter(c => ('0' <= c && '9' >= c) || ('a' <= c.toLowerCase() && 'f' >= c.toLowerCase())).length === 6)

const isValidField = (person) => (key) => {
  const value = person[key]
  if (value == undefined) return false
  switch (key) {
    case 'byr': return (parseInt(value) >= 1920 && parseInt(value) <= 2002)
    case 'iyr': return (parseInt(value) >= 2010 && parseInt(value) <= 2020)
    case 'eyr': return (parseInt(value) >= 2020 && parseInt(value) <= 2030)
    case 'hgt': {
      const [_, height, unit] = value.match(/(\d*)(.*)/)
      switch (unit) {
        case 'cm': return (parseInt(height) >= 150 && parseInt(height) <= 193)
        case 'in': return (parseInt(height) >= 59 && parseInt(height) <= 76)
        default: return false
      }
    }
    case 'hcl': return isHexValid(value)
    case 'ecl': return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    case 'pid': return value.length === 9 && !isNaN(value)
    default: return false
  }
}

const checkFieldValidPerson = person =>
  (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].filter(isValidField(person)).length) === 7

const solve2 = data => {
  return data.filter(person => checkFieldValidPerson(person)).length
}

const main = async () => {
  const data = await getInput()
  const formattedData = getFormattedData(data)
  console.log(solve1(formattedData))
  console.log(solve2(formattedData))
}




main().then(() => { })