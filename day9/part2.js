const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/).map(s => parseInt(s, 10))

const TARGET = 32321523;

let index = 0;
let result = null;

while (!result && index < data.length) {
  let current = index;
  let sum = 0;
  while (sum < TARGET) {
    sum += data[current];
    current += 1;
  }
  if (sum === TARGET) {
    result = data.slice(index, current)
  }
  index += 1;
}

console.log(Math.min(...result) + Math.max(...result))