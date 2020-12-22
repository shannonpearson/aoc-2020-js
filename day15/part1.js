const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split(',');

const numbers = [...data];
const dict = numbers.reduce((acc, n, i) => ({ ...acc, [n]: i }), {});
let i = numbers.length;

while (i < 2020) {
  const lastNumberSpoken = numbers[i - 1];
  if (dict.hasOwnProperty(lastNumberSpoken)) {
    numbers.push(i - 1 - dict[lastNumberSpoken]);
  } else {
    numbers.push(0);
  }
  dict[lastNumberSpoken] = i - 1;
  i++;
}

console.log(numbers.slice(numbers.length - 10));
