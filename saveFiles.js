

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("testFile.mp3");
const request = http.get("https://www.ldoceonline.com/media/english/exaProns/p008-000963493.mp3?version=1.2.45",
  function(response) {
  response.pipe(file);
});
