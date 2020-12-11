const { getInput, zip, sort, zip3 } = require('../helper/input')

const SYMBOLS = {
  'EMPTY_SEAT': 'L',
  'FLOOR': '.',
  'OCCUPIED_SEAT': '#'
}

const adjacent = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]

const getAdjacentData = ([i, j], data) => adjacent.map(([ai, aj]) => data[i + ai] && data[i + ai][j + aj]).filter(Boolean)

const getFirstSeeSeat = (current, translation, data) => {
  const next = [current[0] + translation[0], current[1] + translation[1]]
  const seat = data[next[0]] && data[next[0]][next[1]]
  if (seat == SYMBOLS.FLOOR) return getFirstSeeSeat(next, translation, data)
  return seat
}

const getFirstSeeAdjacentData = ([i, j], data) => adjacent.map((translation) => getFirstSeeSeat([i, j], translation, data)).filter(Boolean)

const convertDataString = (data) => data.reduce((acc, item) => `${acc}\n${item.join('')}`, '')

const transformSeat = (data, updateSeat) => {
  let hasChanged = false
  let newData = Array.from(Array(data.length), () => new Array(data[0].length));
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      newData[i][j] = updateSeat([i, j], data)
      if (newData[i][j] != data[i][j]) {
        hasChanged = true
      }
    }
  }
  if (hasChanged == false) {
    return data
  }
  return transformSeat(newData, updateSeat)
}

const solve1 = (data) => {
  const updateSeat = ([i, j], data) => {
    const adjacentData = getAdjacentData([i, j], data)
    switch (data[i][j]) {
      case SYMBOLS.EMPTY_SEAT: {
        const hasNoOccupiedSeat = !adjacentData.find(seat => seat == SYMBOLS.OCCUPIED_SEAT)
        if (hasNoOccupiedSeat) {
          return SYMBOLS.OCCUPIED_SEAT
        }
        break;
      }
      case SYMBOLS.OCCUPIED_SEAT: {
        const hasMoreThan3OccupiedSeat = adjacentData.filter(seat => seat == SYMBOLS.OCCUPIED_SEAT).length >= 4
        if (hasMoreThan3OccupiedSeat) {
          return SYMBOLS.EMPTY_SEAT
        }
        break;
      }
    }
    return data[i][j]
  }
  const transformedSeat = transformSeat(data, updateSeat)
  return transformedSeat.reduce((acc, item) => acc + item.filter(i => i == SYMBOLS.OCCUPIED_SEAT).length, 0)
}

const solve2 = (data) => {
  const updateSeat = ([i, j], data) => {
    const adjacentData = getFirstSeeAdjacentData([i, j], data)
    switch (data[i][j]) {
      case SYMBOLS.EMPTY_SEAT: {
        const hasNoOccupiedSeat = !adjacentData.find(seat => seat == SYMBOLS.OCCUPIED_SEAT)
        if (hasNoOccupiedSeat) {
          return SYMBOLS.OCCUPIED_SEAT
        }
        break;
      }
      case SYMBOLS.OCCUPIED_SEAT: {
        const hasMoreThan4OccupiedSeat = adjacentData.filter(seat => seat == SYMBOLS.OCCUPIED_SEAT).length >= 5
        if (hasMoreThan4OccupiedSeat) {
          return SYMBOLS.EMPTY_SEAT
        }
        break
      }
    }
    return data[i][j]
  }
  const transformedSeat = transformSeat(data, updateSeat)
  return transformedSeat.reduce((acc, item) => acc + item.filter(i => i == SYMBOLS.OCCUPIED_SEAT).length, 0)
}


const main = async () => {
  const data = await getInput()
  console.log(solve1(data))
  console.log(solve2(data))
}

main().then(() => { })