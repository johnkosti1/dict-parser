const fs = require('fs');
const getWholeDescription = require('./parserHelpers');

const parser = require('node-html-parser')



const data = fs.readFileSync('./longman3000.json', 'utf8')
const words = JSON.parse(data);

const result = {};
for(let i = 0; i < words.length; ++i) {
  result[words[i]] = []
  const data = fs.readFileSync(`./html/${words[i]}.html`, 'utf8');
  var doc = parser.parse(data);
  result[words[i]] = getWholeDescription(doc);
}

fs.writeFile('./blabla.json', JSON.stringify(result), 'utf8',function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('File created!');
});
