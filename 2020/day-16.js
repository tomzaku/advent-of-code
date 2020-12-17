const { getInput, zip, sort, zip3, makeGroup, sum, transpose, all, omit, merge } = require('../helper/input')

const getFormattedData = (data, isNotJoin = false) => {
  const [rules, yourTickets, nearByTickets] = makeGroup(data)((line) => line == '')
  const formattedRules = rules.reduce((acc, line) => {
    const [, key, value1, value2] = line.match(/(.*): (\d+-\d+) or (\d+-\d+)/)
    return { ...acc, [key]: [value1.split('-').map(i => parseInt(i)), value2.split('-').map(i => parseInt(i))] }
  }, {})
  const formattedNearByTickets = isNotJoin ? nearByTickets.slice(1).map(line => line.split(',').map(i => parseInt(i))) : nearByTickets.slice(1).join(',').split(',').map(i => parseInt(i))
  const formattedYourTickets = yourTickets.slice(1).join(',').split(',').map(i => parseInt(i))
  return {
    rules: formattedRules,
    yourTickets: formattedYourTickets,
    nearByTickets: formattedNearByTickets
  }
}
const mergeRules = (rules) => {
  const sortedRules = rules.sort(([a], [b]) => a - b)
  return sortedRules.reduce((acc, rule) => {
    if (acc.length == 0) return [rule]
    const lastAcc = acc[acc.length - 1]
    if (rule[0] > lastAcc[1]) return [...acc, rule]
    if (rule[0] <= lastAcc[1]) return [...acc.slice(0, -1), [lastAcc[0], Math.max(rule[1], lastAcc[1])]]
  }, [])
}

const isValidRules = (rules, number) => {
  return rules.reduce((acc, rule) => acc && number >= rule[0] && number <= rule[1], true)
}

const isAnyValidRules = (rules, number) => {
  return rules.reduce((acc, rule) => acc || (number >= rule[0] && number <= rule[1]), false)
}

const getInvalidTickets = (data) => {
  const allRules = Object.values(data.rules).reduce((acc, item) => [...acc, ...item], [])
  const mergedRules = mergeRules(allRules)
  const invalidTickets = data.nearByTickets.filter(ticket => !isValidRules(mergedRules, ticket))
  return invalidTickets
}
const solve1 = (data) => {
  return sum(getInvalidTickets(data))
}

const solve2 = (data, invalidTickets) => {
  const nearByTicketsRows = transpose(data.nearByTickets)
  const rulesIndex = nearByTicketsRows.map((row, index) => {
    const nearByRules = Object.entries(data.rules).filter(([key, departureRule]) => {
      return all(row)(ticket => invalidTickets.includes(ticket) || isAnyValidRules(departureRule, ticket))
    })
    return [index + 1, nearByRules.map(([ruleName]) => ruleName)]
  })
  const removedRulesIndex = rulesIndex.sort(([, a], [, b]) => a.length - b.length).reduce((acc, [index, ruleNames]) => {
    const removedRuleNames = omit(ruleNames, acc.all)
    return {
      all: merge([ruleNames], acc.all),
      result: [
        ...acc.result,
        [index, removedRuleNames]
      ]
    }
  }, { all: [], result: [] }).result
  const departureIndexes = removedRulesIndex.filter(([index, [ruleName]]) => ruleName.search('departure') === 0).map(([index]) => index)
  const yourTicketsDeparture = departureIndexes.map(i => data.yourTickets[i - 1])
  return yourTicketsDeparture.reduce((a, b) => a * b, 1)
}

const main = async () => {
  const data = await getInput()
  const formattedData = getFormattedData(data)
  console.log(solve1(formattedData))
  console.log(solve2(getFormattedData(data, true), getInvalidTickets(formattedData)))
}

main().then(() => { })