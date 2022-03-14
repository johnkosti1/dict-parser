const request = require('request');
const fs = require('fs');

const url = 'http://ldoceonline.com/dictionary';
const word = 'the'


request(`${url}/${word}`, function (err, res, body) {
  if(err)
  {
    console.log(err, "error occured while hitting URL");
  }
  else
  {
    fs.writeFile('./text.html', body, () => {
    
    })
  }
});

// const crawler = new Crawler(`ldoceonline.com/dictionary/the`);
// crawler.crawl();
//
// crawler.on('data', data => {
//   console.log('data', data, data.body)
// });
// crawler.on('error', error => {
//   console.log('error', error)
// });
// crawler.on('end', () => {
//   console.log('end')
// });

// afterLoad('https://google.com', function(html){
//   console.log(html);
// });

// getHTML(`${url}/${word}`).then(
//   ({ url, html, stats, headers, statusCode }) =>
//     console.log(`
//        url: ${url}
//       html: ${Buffer.from(html).byteLength} bytes (HTTP ${statusCode})
//       time: ${stats.timing} (${stats.mode})
//    headers: ${Object.keys(headers).reduce(
//       (acc, key) => `${acc}${key}=${headers[key]} `,
//       ''
//     )}
// `))

// https.get(`${url}/${word}`, function(res){
//   console.log(res);//if you wish to console log the respone from the server
//   // fs.writeFile('./response.ts', JSON.stringify(res), function (err) {
//   //   if (err) {
//   //     return console.error(err);
//   //   }
//   //   console.log('File created!');
//   // });
// })

