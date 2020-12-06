const fetch = require('node-fetch')

const answers = []

const main = async (answers, questionIndex) => {
  const path = `https://adventofcode.com/2020/day/${questionIndex}/answer`
  answers.forEach(async answer => {
    const response = await fetch(path, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "_ga=GA1.2.1816582255.1606297316; _gid=GA1.2.292817330.1606747629; _gat=1; session=xxxxxx"
      },
      "referrer": "https://adventofcode.com/2020/day/1",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `level=${questionIndex}&answer=${answer}`,
      "method": "POST",
      "mode": "cors"
    });
    const body = await response.text();
    console.log(body)
  })

}


main([1], 1).then(() => { })
