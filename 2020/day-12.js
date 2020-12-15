const { getInput, zip, sort, zip3 } = require('../helper/input')

const getFormattedData = (data) => data.map((rotateCommand) => {
  const [_, rotateDirection, rotateDegree] = rotateCommand.match(/([A-Z])(\d+)/)
  return {
    direction: rotateDirection,
    degree: parseInt(rotateDegree)
  }
})
const convertToRightDegree = (rotate) => {
  if (rotate.direction == 'R') return rotate.degree
  return 360 - rotate.degree
}
const solve1 = (data) => {
  const nextDirection = (currentDirection, rotate) => {
    const directions = ['N', 'E', 'S', 'W']
    const rightRotateDegree = convertToRightDegree(rotate)
    return directions[(directions.findIndex(d => d === currentDirection) + (rightRotateDegree / 90)) % directions.length]
  }
  const updateLocation = (move, current) => {
    const { direction, degree } = move
    switch (direction) {
      case 'N': return { ...current, north: current.north + degree }
      case 'S': return { ...current, north: current.north - degree }
      case 'E': return { ...current, east: current.east + degree }
      case 'W': return { ...current, east: current.east - degree }
    }
  }

  const getFinalLocation = (moveList = [], current = { direction: 'E', north: 0, east: 0 }) => {
    if (moveList.length === 0) return current
    const { direction, degree } = moveList[0]
    const nextMoveList = moveList.slice(1)
    switch (direction) {
      case 'R':
      case 'L': return getFinalLocation(nextMoveList, { ...current, direction: nextDirection(current.direction, moveList[0]) })
      case 'N':
      case 'S':
      case 'E':
      case 'W': return getFinalLocation(nextMoveList, updateLocation(moveList[0], current))
      case 'F': return getFinalLocation(nextMoveList, updateLocation({ direction: current.direction, degree }, current))
    }
  }
  const moveList = getFormattedData(data)
  const finalLocation = getFinalLocation(moveList)
  return Math.abs(finalLocation.north) + Math.abs(finalLocation.east)
}

const solve2 = (data) => {
  const moveList = getFormattedData(data)
  const getNextAcceleration = (acceleration, rotate) => {
    const rightRotateDegree = convertToRightDegree(rotate)
    switch (rightRotateDegree) {
      case 90: return { north: -acceleration.east, east: acceleration.north }
      case 180: return { north: -acceleration.north, east: -acceleration.east }
      case 270: return { north: acceleration.east, east: - acceleration.north }
      default: return acceleration
    }
  }
  const getFinalLocation = (moveList = [], current = { north: 0, east: 0 }, acceleration = { north: 1, east: 10 }) => {
    if (moveList.length === 0) return current
    const { direction, degree } = moveList[0]
    const nextMoveList = moveList.slice(1)
    switch (direction) {
      case 'R':
      case 'L': return getFinalLocation(nextMoveList, current, getNextAcceleration(acceleration, moveList[0]))
      case 'N': return getFinalLocation(nextMoveList, current, { ...acceleration, north: acceleration.north + degree })
      case 'S': return getFinalLocation(nextMoveList, current, { ...acceleration, north: acceleration.north - degree })
      case 'E': return getFinalLocation(nextMoveList, current, { ...acceleration, east: acceleration.east + degree })
      case 'W': return getFinalLocation(nextMoveList, current, { ...acceleration, east: acceleration.east - degree })
      case 'F': return getFinalLocation(nextMoveList, { north: current.north + degree * acceleration.north, east: current.east + degree * acceleration.east }, acceleration)
    }
  }
  const finalLocation = getFinalLocation(moveList)
  return Math.abs(finalLocation.north) + Math.abs(finalLocation.east)
}

const main = async () => {
  const data = await getInput()
  console.log(solve1(data))
  console.log(solve2(data))
}

main().then(() => { })