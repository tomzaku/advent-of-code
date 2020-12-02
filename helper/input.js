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

module.exports = {
  getInput
}