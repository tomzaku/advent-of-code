const { getInput } = require('../helper/input')

const getFormattedData = (data) => data.map(line => {
  const matched = line.match(/([jmp|acc|nop]+) (-?\+?\d+)/)
  return [matched[1], parseInt(matched[2])]
})

const getAccumulator = (data, traceList = [], result = [0, 0]) => {
  const [index, accumulator] = result
  if (index === data.length) {
    return result
  }
  const [operation, argument] = data[index]
  if (traceList.includes(index)) return [index, accumulator]
  switch (operation) {
    case 'nop': return getAccumulator(data, [...traceList, index], [index + 1, accumulator])
    case 'acc': return getAccumulator(data, [...traceList, index], [index + 1, argument + accumulator])
    case 'jmp': return getAccumulator(data, [...traceList, index], [index + argument, accumulator])
    default: return [index, 0]
  }
}

const solve1 = (data) => getAccumulator(data)[1]

const solve2 = (data, traceList = [], index = 0) => {
  for (let index = 0; index < data.length; index++) {
    const [operation, argument] = data[index]
    if (operation == 'nop' || operation == 'jmp') {
      const changeOperation = operation == 'nop' ? 'jmp' : 'nop'
      const nextData = [...data.slice(0, index), [changeOperation, argument], ...data.slice(index + 1)]
      const result = getAccumulator(nextData)
      if (result[0] === data.length) {
        return result[1]
      }
    }
  }
}

const main = async () => {
  const data = await getInput()
  const formattedData = getFormattedData(data)
  console.log(solve1(formattedData))
  console.log(solve2(formattedData))
}

main().then(() => { })