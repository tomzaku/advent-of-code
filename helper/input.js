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

module.exports = {
  getInput,
  zip,
  zip3,
  sort
}