const fs = require('fs');
let [time, buses] = fs.readFileSync('./input.txt', 'utf8').split(/\n/);

time = Number(time);

buses = buses
  .split(',')
  .reduce((acc, b) => (b === 'x' ? acc : [...acc, Number(b)]), []);

const departures = buses.reduce(
  (acc, b) => ({ ...acc, [b]: time + (b - (time % b)) }),
  {}
);

const busId = Object.keys(departures).reduce((acc, key) =>
  Math.min(departures[key] < departures[acc] ? key : acc)
);

console.log(busId * (departures[busId] - time));
