const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/).map(s => parseInt(s, 10)).sort((a, b) => a-b)

data.unshift(0)

const dict = {
  1: 0,
  2: 0,
  3: 1
}

for (let i = 1; i < data.length; i += 1) {
  dict[data[i] - data[i - 1]]++
}

console.log(dict[1] * dict[3])