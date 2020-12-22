const fs = require('fs');

let instructionSets = fs
  .readFileSync('./input.txt', 'utf8')
  .split('mask = ')
  .map(x => x.split(/\n/).filter(x => x))
  .filter(a => a.length);

const memory = {};

const getXORPermutations = str => {
  if (!str.length) {
    return [''];
  }
  if (str[0] !== 'X') {
    return getXORPermutations(str.slice(1)).map(perm => `0${perm}`);
  }
  return [0, 1].reduce((acc, n) => {
    getXORPermutations(str.slice(1)).forEach(perm => {
      acc.push(`${n}${perm}`);
    });
    return acc;
  }, []);
};

instructionSets.forEach(([mask, ...instructions]) => {
  instructions = instructions.map(str => str.match(/\d+/g));

  const orMask = BigInt(`0b${mask.replace(/X/g, '0')}`);
  const XORPermutations = getXORPermutations(mask);

  instructions.forEach(([targetMemLocation, value]) => {
    const masked = BigInt(targetMemLocation) | orMask;
    const maskedPermutations = XORPermutations.map(
      perm => masked ^ BigInt(`0b${perm}`)
    );

    maskedPermutations.forEach(locationPermutation => {
      memory[locationPermutation] = Number(value);
    });
  });
});

console.log(
  Object.values(memory).reduce((acc, v) => acc + v, 0) === 4355897790573
);
