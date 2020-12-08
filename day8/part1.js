const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/)

const instructions = data.map(dir => {
  let [cmd, value] = dir.split(' ')
  return { cmd, value: parseInt(value), done: false }
})

let pos = 0;
let accumulator = 0;

while (true) {
  const { cmd, value, done } = instructions[pos]
  if (done) {
    break
  }
  instructions[pos].done = true
  cmd === 'jmp' ? pos += value : pos += 1
  if (cmd === 'acc') accumulator += value
}

console.log(accumulator)
