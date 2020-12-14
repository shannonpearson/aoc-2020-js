const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/).map(s => parseInt(s, 10))

const PREAMBLE_LENGTH = 25
let missing = null;

const hasAddends = n => {
  for (let i = n - PREAMBLE_LENGTH; i < n - 1; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (data[i] !== data[j] && data[i] + data[j] === data[n]) {
        return true
      }
    }
  }
  return false
}

for (let index = PREAMBLE_LENGTH; index < data.length && !missing; index += 1) {
  if (!hasAddends(index)) {
    missing = data[index]
  }
}

console.log(missing)