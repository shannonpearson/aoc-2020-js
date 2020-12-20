const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/);

let shipPosition = [0, 0];
let waypointPosition = [10, 1];

const cardinals = { N: 1, S: 1, E: 1, W: 1 };

const moveTowardWaypoint = count => {
  const moveX = (waypointPosition[0] - shipPosition[0]) * count;
  const moveY = (waypointPosition[1] - shipPosition[1]) * count;
  [shipPosition, waypointPosition].forEach(arr => {
    arr[0] += moveX;
    arr[1] += moveY;
  });
};

const moveWaypoint = (direction, count) => {
  if (direction === 'N') {
    return (waypointPosition[1] += count);
  }
  if (direction === 'S') {
    return (waypointPosition[1] -= count);
  }
  if (direction === 'E') {
    return (waypointPosition[0] += count);
  }
  if (direction === 'W') {
    return (waypointPosition[0] -= count);
  }
};

const rotateWaypoint = (direction, count) => {
  const offset = [
    waypointPosition[0] - shipPosition[0],
    waypointPosition[1] - shipPosition[1],
  ];
  if (count === 90) {
    if (direction === 'L') {
      waypointPosition = [
        shipPosition[0] - offset[1],
        shipPosition[1] + offset[0],
      ];
    } else {
      waypointPosition = [
        shipPosition[0] + offset[1],
        shipPosition[1] - offset[0],
      ];
    }
  }
  if (count === 180) {
    waypointPosition = waypointPosition.map(
      (_, i) => shipPosition[i] - offset[i]
    );
  }
  if (count === 270) {
    if (direction === 'L') {
      waypointPosition = [
        shipPosition[0] + offset[1],
        shipPosition[1] - offset[0],
      ];
    } else {
      waypointPosition = [
        shipPosition[0] - offset[1],
        shipPosition[1] + offset[0],
      ];
    }
  }
};

const move = command => {
  let d = command[0];
  const count = Number(command.slice(1));
  console.log(shipPosition);
  console.log(waypointPosition);
  console.log(command);
  if (d === 'F') {
    moveTowardWaypoint(count);
  }
  if (cardinals[d]) {
    moveWaypoint(d, count);
  }
  if (d === 'R' || d === 'L') {
    rotateWaypoint(d, count);
  }
  console.log(shipPosition);
  console.log(waypointPosition);
  console.log();
};

data.forEach(instruction => move(instruction));

console.log(Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]));
