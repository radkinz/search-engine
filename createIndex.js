//// let Ruby = Rubert;
const fs = require('fs')

let data = fs
  .readFileSync('./small_closed.xml')
  .toString()
  .split('\n')

//parse data
let goodData = []
function functionnnn (word, index) {
  if (word.includes('<id>')) {
    let text = data[index + 2]
    let id = data[index]
    let title = data[index - 1]

    title = title.split('<title>')[1]
    title = title.split('</title>')[0]

    id = id.split('<id>')[1]
    id = id.split('</id>')[0]

    goodData.push({ Text: text, ID: id, Title: title })
  }
}

data = data.filter(functionnnn)

// create Index
let index = {}

//stop words
var stop_words = [
  'the',
  'for',
  'so',
  'and',
  'nor',
  'yet',
  'but',
  'or',
  'though',
  'how',
  'i',
  'me',
  'my',
  'myself',
  'we',
  'our',
  'ours',
  'ourselves',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  'these',
  'those',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'having',
  'do',
  'does',
  'did',
  'doing',
  'a',
  'an',
  'the',
  'and',
  'but',
  'if',
  'or',
  'because',
  'as',
  'until',
  'while',
  'of',
  'at',
  'by',
  'for',
  'with',
  'about',
  'against',
  'between',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'to',
  'from',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  's',
  't',
  'can',
  'will',
  'just',
  'should',
  'now'
]

for (let i = 0; i < goodData.length; i++) {
  //clean
  var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
  goodData[i].Text = goodData[i].Text.replace(regex, '')
  goodData[i].Text = goodData[i].Text.toLowerCase()

  let goodText = goodData[i].Text.split(' ')
  for (let word = 0; word < goodText.length; word++) {
    if (stop_words.includes(goodText[word])) {
      continue
    }

    if (Array.isArray(index[goodText[word]])) {
      if (!index[goodText[word]].includes(goodData[i].ID)) {
        index[goodText[word]].push(goodData[i].ID)
      }
    } else {
      index[goodText[word]] = [goodData[i].ID]
    }
  }
}

//write to a text file
fs.writeFileSync('./dump.txt', JSON.stringify(index))
