import * as parser from 'node-html-parser'
import fetch from 'node-fetch';

async function test() {
  const response = await fetch('https://api.github.com/users/github');
  const data = await response.json();

  console.log(data);
}

test().then()

// fetch('./html/abandon.html')
//   .then(response => {
//     console.log('resss', response)
//     return response.text()
//   })
//   .then(data => {
//     var doc = parser.parse(data);
//     console.log(doc)
//   });
