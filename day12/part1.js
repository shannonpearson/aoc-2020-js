const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/);

const DIR = {
  0: 'N',
  90: 'E',
  180: 'S',
  270: 'W',
};

const coordinates = [0, 0];
let facingDirection = 90;

const DICT = {
  N: c => (coordinates[1] += c),
  S: c => (coordinates[1] -= c),
  W: c => (coordinates[0] -= c),
  E: c => (coordinates[0] += c),
  R: c => (facingDirection = (facingDirection + c) % 360),
  L: c => {
    let newDirection = facingDirection - c;
    if (newDirection < 0) newDirection = 360 + newDirection;
    facingDirection = newDirection;
  },
};

const move = command => {
  let d = command[0];
  const count = Number(command.slice(1));
  if (d === 'F') {
    d = DIR[facingDirection];
  }
  DICT[d](count);
};

data.forEach(instruction => move(instruction));

console.log(Math.abs(coordinates[0]) + Math.abs(coordinates[1]));
