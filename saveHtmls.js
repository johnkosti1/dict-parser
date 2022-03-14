const request = require('request');
const fs = require('fs');
const url = 'http://ldoceonline.com/dictionary';

const str = (body) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body> ${body}
</body>
</html>
`
try {
  const data = fs.readFileSync('./missedWords.json', 'utf8')
  const words = JSON.parse(data)
  for(let i = 200; i < words.length; ++i) {
    request(`${url}/${words[i]}`, function (err, res, body) {
      if(err)
      {
        console.log(err, "error occured while hitting URL");
      }
      else
      {
        fs.writeFile(`./html/${words[i]}.html`, str(body), 'utf8', (err) => {
          if (err) {
            console.log(`error on word: ${words[i]}`)
          } else {
            console.log(`Success ${words[i]}`)
          }
        })
      }
    })
  }
} catch (err) {
  console.error(err)
}
