const fs = require('fs');
let instructionSets = fs
  .readFileSync('./input.txt', 'utf8')
  .split('mask = ')
  .map(x => x.split(/\n/).filter(x => x))
  .filter(a => a.length);

const memory = {};

instructionSets.forEach(([mask, ...instructions]) => {
  const orMask = BigInt(`0b${mask.replace(/X/g, '0')}`);
  const andMask = BigInt(`0b${mask.replace(/X/g, '1')}`);

  instructions = instructions.map(str => str.match(/\d+/g));

  instructions.forEach(([targetMemLocation, value]) => {
    memory[targetMemLocation] = (BigInt(value) | orMask) & andMask;
  });
});

console.log(Object.values(memory).reduce((acc, v) => acc + v, BigInt(0)));
