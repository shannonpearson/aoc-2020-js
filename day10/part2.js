const { count } = require('console')
const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/).map(s => parseInt(s, 10)).sort((a, b) => a-b)

const results = { 0: 1 }

data.forEach((n) => {
  results[n] = (results[n - 1] || 0) + (results[n - 2] || 0) + (results[n - 3] || 0)
})

console.log(results[data[data.length - 1]])