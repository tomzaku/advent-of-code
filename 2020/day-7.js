const { getInput } = require('../helper/input')


const getBagInfo = line => {
  const [_, color, children] = line.match(/(.+) bags contain (.+)./)
  if (children === 'no other bags') return { color, children: undefined }
  return {
    color,
    children: children.split(',').reduce((acc, childrenBag) => {
      const [_, number, color] = childrenBag.match(/(\d+) (.+) bag/)
      return {
        ...acc,
        [color]: parseInt(number)
      }
    }, {})
  }
}

/**
 * Format readable data
 * @param {*} data
 *
 * {
 *  'light red': {
 *    'bright white': 3,
 *    'muted yellow': 2
 *  }
 * }
 */
const getFormattedData = data => data.reduce((acc, line) => {
  const { color, children } = getBagInfo(line)
  return {
    ...acc,
    [color]: children
  }
}, {})

const isOverlap = (arr1 = [], arr2) => {
  for (item of arr1) {
    if (arr2.includes(item)) {
      return true
    }
  }
  return false
}

// TODO: Move gColors to local scope
const gColors = []
const countBagColors = (colors, data) => {
  Object.entries(data).forEach(([color, children]) => {
    if (!gColors.includes(color) && children) {
      if (isOverlap(Object.keys(children), colors)) {
        gColors.push(color)
        countBagColors([...colors, color], data)
      }
    }
  })
}


const solve1 = (data) => {
  const formattedData = getFormattedData(data)
  countBagColors(['shiny gold'], formattedData)
  return gColors.length
}


const countIndividualBags = (bag, formattedData) => {
  if (bag === undefined) return 0
  return Object.entries(bag).reduce((acc, [color, number]) => {
    return acc + number + number * countIndividualBags(formattedData[color], formattedData)
  }, 0)
}

const solve2 = (data) => {
  const formattedData = getFormattedData(data)
  return countIndividualBags(formattedData['shiny gold'], formattedData)
}

const main = async () => {
  const data = await getInput()
  console.log(solve1(data))
  console.log(solve2(data))
}

main().then(() => { })