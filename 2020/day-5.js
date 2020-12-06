const { getInput } = require('../helper/input')

const getIndex = (code, [begin, end]) => {
  if (code === '') return begin
  if (['F', 'L'].includes(code[0])) return getIndex(code.slice(1), [begin, begin + Math.floor((end - begin) / 2)])
  return getIndex(code.slice(1), [begin + Math.ceil((end - begin) / 2), end])
}

const zip = (arr1, arr2) => arr1.map((_, index) => [arr1[index], arr2[index]])


const solve2 = (ids) => {
  const sortedIds = ids.sort()
  const myPair = zip(sortedIds.slice(1), sortedIds).find((pair) => (pair[0] - pair[1]) == 2)
  return (myPair[0] - 1)
}

const main = async () => {
  const data = await getInput()
  const ids = data.map(code => {
    const row = getIndex(code.slice(0, 7), [0, 127])
    const column = getIndex(code.slice(7), [0, 7])
    const seatId = row * 8 + column
    return seatId
  })

  const result1 = Math.max(...ids)
  console.log(result1)


  const result2 = solve2(ids)
  console.log(result2)
}



main().then(() => { })