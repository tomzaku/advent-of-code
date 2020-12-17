const { getInput, zip, sort, zip3 } = require('../helper/input')


const solve1 = (startMins, availableBus) => {
  const buses = availableBus.map(i => ({ id: i, mins: i * Math.ceil(startMins / i) }))
  const targetedBus = buses.reduce((acc, bus) => acc.mins > bus.mins ? bus : acc, { mins: Infinity })
  return targetedBus.id * (targetedBus.mins - startMins)
}

const main = async () => {
  const data = await getInput()
  const startMins = parseInt(data[0])
  const availableBus = data[1].split(',').filter((i) => !isNaN(i)).map(i => parseInt(i))
  console.log(solve1(startMins, availableBus))
}

main().then(() => { })