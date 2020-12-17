const { getInput, zip, sort, zip3, makeGroup, sum } = require('../helper/input')

const getFormattedData = (data) => {
  const groupedData = makeGroup(data)(line => line.search("mask") == 0, true, true)
  return groupedData.map(ram => {
    const [_, mask] = ram[0].match(/mask = (.+)/)
    const mem = ram.slice(1).reduce((acc, line) => {
      const [_, index, value] = line.match(/mem\[(\d+)\] = (\d+)/)
      return {
        ...acc,
        [parseInt(index)]: parseInt(value)
      }
    }, {})
    return { mask, mem }
  })
}
function createBinaryString(value) {
  const binaryValue = value.toString(2)
  const addedZero = new Array(36 - binaryValue.length).fill('0').join('') + binaryValue
  return addedZero
}

const getOrBit = (mask, value) => {
  const binary32Value = createBinaryString(value)
  return mask.split('').map((bit, index) => bit == 'X' ? binary32Value[index] : bit).join('')
}

const solve1 = (data) => {
  const result = data.reduce((acc, ram) => {
    const memMasks = Object.entries(ram.mem).reduce((acc1, [address, mem]) => {
      const result = getOrBit(ram.mask, mem)
      return {
        ...acc1,
        [address]: parseInt(result, 2)
      }
    }, {})
    return {
      ...acc,
      ...memMasks
    }
  }, {})
  return sum(Object.values(result))
}

const main = async () => {
  const data = await getInput()
  const formattedData = getFormattedData(data)
  console.log(solve1(formattedData))
}

main().then(() => { })