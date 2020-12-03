const fs = require('fs')
const forest = fs.readFileSync('./input.txt').toString().split('\n')

const height = forest.length
const width = forest[0].length

const isTree = s => s === "#"
let pos = { x: 0, y: 0 }

const move = (down, right) => {
  pos.x = (pos.x + right) % width
  pos.y += down
}

const treeCounts = []
const paths = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
]

paths.forEach(({down, right}) => {
  let treeCount = 0;
  pos = { x: 0, y: 0 }
  
  while (pos.y < height) {
    console.log(pos.x, pos.y, forest[pos.y][pos.x])
    if (isTree(forest[pos.y][pos.x])) {
      treeCount++
    }
    move(down, right)
  }

  treeCounts.push(treeCount)
})


console.log(treeCounts)
console.log(treeCounts.reduce((acc, x) => acc  * x, 1))
