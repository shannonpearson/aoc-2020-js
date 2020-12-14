const { count } = require('console')
const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/).map(s => parseInt(s, 10)).sort((a, b) => a-b)
data.unshift(0)

const getPrevious = i => [i - 1, i - 2, i - 3].filter(x => x >= 0 && data[i] - data[x] < 4)

const dict = {}
data.forEach((n, i) => {
  const p = getPrevious(i)
  dict[i] = { preceding: p }
})

Object.keys(dict).sort((a, b) => a-b).forEach(k => {
  const value = dict[k]
  value.count = 1;
  if (value.preceding.length) {
    value.count = 0;
    value.preceding.forEach(i => {
      value.count += dict[i].count
    })
  }
})

console.log(dict)