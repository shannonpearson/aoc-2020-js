const fs = require('fs')
const forest = fs.readFileSync('./input.txt').toString().split('\n')

console.log(forest.slice(0, 20))
const height = forest.length
const width = forest[0].length

const isTree = s => s === "#"
const pos = { x: 0, y: 0 }
const move = () => {
  pos.x = (pos.x + 3) % width
  pos.y += 1
}

let treeCount = 0

while (pos.y < height) {
  console.log(pos.x, pos.y, forest[pos.y][pos.x])
  if (isTree(forest[pos.y][pos.x])) {
    treeCount++
  }
  move()
}

console.log(treeCount)
