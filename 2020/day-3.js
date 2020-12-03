const { getInput } = require('../helper/input')

const countTree = (map, jump, position) => {
  if (position[0] >= map.length) return 0
  const nextPosition = [position[0] + jump.bottom, (position[1] + jump.right) % (map[0].length)]
  if (map[position[0]][position[1]] === '#') return 1 + countTree(map, jump, nextPosition)
  return countTree(map, jump, nextPosition)
}

const productTree = (data, jumps) => {
  const result = jumps.map(([right, bottom]) => countTree(data, { right, bottom }, [bottom, right])).reduce((acc, item) => acc * item, 1)
  return result
}

const main = async () => {
  const data = await getInput()
  console.log(countTree(data, { right: 3, bottom: 1 }, [1, 3]))
  console.log(productTree(data, [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]))
}

main().then(() => { })