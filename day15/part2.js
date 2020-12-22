const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split(',');

let lastNumberSpoken = data[data.length - 1];
const dict = new Map();
data.forEach((n, i) => dict.set(Number(n), i));
let i = data.length;

while (i < 30000000) {
  const nextNumber = dict.has(lastNumberSpoken)
    ? i - 1 - dict.get(lastNumberSpoken)
    : 0;

  dict.set(lastNumberSpoken, i - 1);
  lastNumberSpoken = nextNumber;
  i++;
}

console.log(lastNumberSpoken);
