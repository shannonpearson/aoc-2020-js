const fs = require('fs')
const boardingPasses = fs.readFileSync('./input.txt', 'utf8').split('\n')

const sorted = boardingPasses.slice()
sorted.sort((a, b) => {
  if (a.slice(0, 7) > b.slice(0, 7)) {
    return -1
  }
  if (a.slice(0, 7) < b.slice(0, 7)) {
    return 1
  }
  return a.slice(7) < b.slice(7) ? -1 : 1
})

const highest = sorted[sorted.length - 1]

const rowInstructions = highest.slice(0, 7).split('')

let min = 0
let max = 127
while (rowInstructions.length) {
  const d = rowInstructions.shift()
  if (d === 'B') {
    min += Math.ceil((max - min) / 2)
  } else {
    max -= Math.ceil((max - min) / 2)
  }
}

const seat = parseInt(highest.slice(7).replace(/R/g, '1').replace(/L/g, 0), 2)
console.log(min * 8 + seat)