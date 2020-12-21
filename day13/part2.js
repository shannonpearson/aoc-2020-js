const fs = require('fs');
const data = fs
  .readFileSync('./input.txt', 'utf8')
  .split(/\n/)[1]
  .split(',')
  .map((n, i) => [Number(n), i])
  .filter(x => x[0]);

let num = data[0][0];
let diff = data[0][0];

for (let i = 1; i < data.length; i += 1) {
  const [busNumber, index] = data[i];
  console.log('num', num, 'diff', diff, 'bus', busNumber);
  while (true) {
    if ((num + index) % busNumber === 0) {
      diff *= busNumber;
      break;
    }
    num += diff;
  }
}

console.log(num);
