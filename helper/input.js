const getInput = async () => {
  return new Promise((resolve, reject) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');

    let inputString = '';
    let currentLine = 0;

    process.stdin.on('data', inputStdin => {
      inputString += inputStdin;
    });

    process.stdin.on('end', _ => {
      inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
      });

      resolve(inputString)
    });
  })
}

const zip = (arr1, arr2) => arr1.map((_, index) => [arr1[index], arr2[index]])
const zip3 = (arr1, arr2, arr3) => arr1.map((_, index) => [arr1[index], arr2[index], arr3[index]])

const sort = arr => arr.sort(function (a, b) { return a - b });

const makeGroup = (data) => (ifMatch, isIncluding = false, isIgnoreFirstItem = false) => {
  const result = []
  let temp = []
  data.forEach((item) => {
    if (ifMatch(item)) {
      result.push(temp)
      temp = []
    } else {
      temp.push(item)
    }
    if (isIncluding) {
      temp.push(item)
    }
  })
  if (temp.length != 0) result.push(temp)
  if (isIgnoreFirstItem) return result.slice(1)
  return result
}

const sum = (x = []) => x.length == 0 ? 0 : x[0] + sum(x.slice(1))

const transpose = m => m[0].map((x, i) => m.map(x => x[i]))

const all = (x = []) => filterFn => x.filter(filterFn).length == x.length

const omit = (arr, removedLists) => arr.filter(i => !removedLists.includes(i))

const merge = (arr, addedLists) => [... new Set(...arr, ...addedLists)]

const findAllIndex = (x = []) => findFn => x.map((item, index) => [item, index]).filter(([item, index]) => findFn(item)).map(([item, index]) => index)

module.exports = {
  getInput,
  zip,
  zip3,
  sort,
  makeGroup,
  sum,
  transpose,
  all,
  omit,
  merge,
  findAllIndex
}