const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/);

let shipPosition = [0, 0];
let waypointOffset = [10, 1];

const cardinals = { N: 1, S: 1, E: 1, W: 1 };

const moveTowardWaypoint = count => {
  shipPosition[0] += waypointOffset[0] * count;
  shipPosition[1] += waypointOffset[1] * count;
};

const moveWaypoint = (d, count) => {
  return eval(
    `waypointOffset[${Number(!!{ N: 1, S: 1 }[d])}] ${
      { N: 1, E: 1 }[d] ? '+' : '-'
    }= ${count}`
  );
};

const rotateWaypoint = (direction, count) => {
  if (direction === 'R') count = 360 - count;
  if (count === 180) {
    return (waypointOffset = waypointOffset.map(n => -n));
  }
  waypointOffset.reverse();
  return (waypointOffset[Number(count === 270)] *= -1);
};

const move = command => {
  const d = command[0];
  const count = Number(command.slice(1));
  if (d === 'F') {
    return moveTowardWaypoint(count);
  }
  if (cardinals[d]) {
    return moveWaypoint(d, count);
  }
  if (d === 'R' || d === 'L') {
    return rotateWaypoint(d, count);
  }
};

data.forEach(instruction => move(instruction));

console.log(Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]));
