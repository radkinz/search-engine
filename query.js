const fs = require('fs');

let query = process.argv

//load object
let index = JSON.parse(fs.readFileSync("dump.txt"));

//loop through arguments
let idArr = [];
for (let i = 2; i < query.length; i++) {
  if (index[query[i]]) {
    idArr.push(index[query[i]]);
  }
}

let wordFreq = {}

for (let i = 0; i < idArr.length; i++) {
  for (let j = 0; j < idArr[i].length; j++) {
    if (wordFreq[idArr[i][j]] !== undefined) {
      wordFreq[idArr[i][j]] += 1;
    } else {
      wordFreq[idArr[i][j]] = 0;
    }
  }
}

let keysSorted = Object.keys(wordFreq).sort(function(a,b){return wordFreq[a]-wordFreq[b]})

console.log(keysSorted);