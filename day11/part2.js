const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().split('\n');

const ROW_COUNT = data.length;
const COL_COUNT = data[0].length;

let initialRoom = data.map(row => row.split(''));
let newRoom = [];
let occupiedCount = 0;

const isFirstSeatInDirectionOccupied = ([startX, startY], [moveX, moveY]) => {
  let x = startX + moveX;
  let y = startY + moveY;

  while (x >= 0 && x < COL_COUNT && y >= 0 && y < ROW_COUNT) {
    if (initialRoom[y][x] === '#') return true;
    if (initialRoom[y][x] === 'L') return false;
    x += moveX;
    y += moveY;
  }
  return false;
};

const DIRECTIONS = [
  [0, -1], // N
  [1, -1], // NE
  [1, 0], // E
  [1, 1], // SE
  [0, 1], // S
  [-1, 1], // SW
  [-1, 0], // W
  [-1, -1], // NW
];

const shouldBecomeEmpty = (y, x) => {
  const closestSeatsOccupiedCount = DIRECTIONS.reduce(
    (acc, directionsArray) => {
      return (
        acc + Number(isFirstSeatInDirectionOccupied([x, y], directionsArray))
      );
    },
    0
  );
  return closestSeatsOccupiedCount > 4;
};

const shouldBecomeOccupied = (y, x) => {
  return !DIRECTIONS.some(directionsArray =>
    isFirstSeatInDirectionOccupied([x, y], directionsArray)
  );
};

while (true) {
  newRoom = initialRoom.map((row, i) =>
    row.map((seat, j) => {
      if (seat === 'L' && shouldBecomeOccupied(i, j)) return '#';
      if (seat === '#' && shouldBecomeEmpty(i, j)) return 'L';
      return seat;
    })
  );
  const count = newRoom.reduce((acc, row) => {
    return (
      acc +
      row.reduce((acc2, seat) => {
        return acc2 + Number(seat === '#');
      }, 0)
    );
  }, 0);

  if (count === occupiedCount) break;
  occupiedCount = count;
  initialRoom = newRoom;
}
console.log(occupiedCount);
