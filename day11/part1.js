const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().split('\n');

let initialRoom = data.map(row => row.split(''));
let newRoom = [];
let occupiedCount = 0;

const shouldBecomeEmpty = (x, y) => {
  if (initialRoom[x][y] !== '#') return false;
  const adjacents = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
  const occupiedAdjacentsCount = adjacents.reduce((acc, [r, d]) => {
    return r >= 0 &&
      r < initialRoom.length &&
      d >= 0 &&
      d < initialRoom[0].length &&
      initialRoom[r][d] === '#'
      ? acc + 1
      : acc;
  }, 0);
  return occupiedAdjacentsCount >= 4;
};

const shouldBecomeOccupied = (x, y) => {
  if (initialRoom[x][y] !== 'L') return false;
  const adjacents = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
  return !adjacents.some(([r, d]) => {
    return (
      r >= 0 &&
      r < initialRoom.length &&
      d >= 0 &&
      d < initialRoom[0].length &&
      initialRoom[r][d] === '#'
    );
  });
};

while (true) {
  newRoom = initialRoom.map((row, i) =>
    row.map((seat, j) => {
      if (seat === 'L' && shouldBecomeOccupied(i, j)) {
        return '#';
      } else if (seat === '#' && shouldBecomeEmpty(i, j)) {
        return 'L';
      } else {
        return seat;
      }
    })
  );
  const count = newRoom.reduce((acc, row) => {
    return (
      acc +
      row.reduce((acc2, seat) => {
        return seat === '#' ? acc2 + 1 : acc2;
      }, 0)
    );
  }, 0);
  if (count === occupiedCount) break;
  occupiedCount = count;
  initialRoom = newRoom;
}

console.log(occupiedCount);
