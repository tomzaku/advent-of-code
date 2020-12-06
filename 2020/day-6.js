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
  if (temp.length != 0) result.push(temp)
  return result
}


const solve1 = (data) => {
  const groupedData = makeGroup(data)(item => item == '')
  return groupedData.reduce((acc, group) => {
    const count = [...new Set(group.reduce((acc, item) => [...acc, ...item], []))].length
    return acc + count
  }, 0)
}

const findDuplicate = (str1, str2) => {
  const hashmapStr1 = str1.split('').reduce((acc, char) => ({ ...acc, [char]: true }), {})
  return str2.split('').filter(char => hashmapStr1[char]).join('')
}

const solve2 = (data) => {
  const groupedData = makeGroup(data)(item => item == '')
  return groupedData.reduce((acc, group) => {
    const count = group.slice(1).reduce((acc, person) => findDuplicate(acc, person), group[0]).length
    return acc + count
  }, 0)
}

const main = async () => {
  const data = await getInput()
  // console.log(solve1(data))
  console.log(solve2(data))
}




main().then(() => { })