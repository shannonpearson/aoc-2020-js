const fs = require('fs')
const data = fs.readFileSync('./part1_input.txt').toString().split('\n').map(s => parseInt(s))

for (let i = 0; i < data.length - 1; i += 1) {
  for (let j = i + 1; j < data.length; j += 1) {
    if (data[i] + data[j] === 2020) {
      return console.log(data[i] * data[j])
    }
  }
}