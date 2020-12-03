const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().split('\n').map(s => parseInt(s))

for (let i = 0; i < data.length - 2; i += 1) {
  for (let j = i + 1; j < data.length - 1; j += 1) {
    for (let k = j + 1; k < data.length; k += 1) {
      if (data[i] + data[j] + data[k] === 2020) {
        return console.log(data[i]*data[j]*data[k])
      }
    }
  }
}