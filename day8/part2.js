const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/)

const instructions = data.map(dir => {
  let [cmd, value] = dir.split(' ')
  return { cmd, value: parseInt(value), done: false }
})

const doTheThing = (i) => {
  let pos = 0;
  let accumulator = 0;
  let returnMe = false
  while (!returnMe) {
    if (pos >= instructions.length) {
      returnMe = true
      break
    }
    const { cmd, value, done } = instructions[pos]
    if (done === i) {
      break
    }
    instructions[pos].done = i
    cmd === 'jmp' ? pos += value : pos += 1
    if (cmd === 'acc') accumulator += value
  }
  return returnMe ? accumulator : returnMe
}

const findWrongInstruction = () => {
  let result;
  for (let i = 0; i < instructions.length; i += 1) {
    let r;
    if (instructions[i].cmd !== 'acc') {
      if (instructions[i].cmd === 'nop') {
        instructions[i].cmd = 'jmp'
        r = doTheThing(i)
        instructions[i].cmd = 'nop'
      }
      if (instructions[i].cmd === 'jmp') {
        instructions[i].cmd = 'nop'
        r = doTheThing(i)
        instructions[i].cmd = 'jmp'
      }
      if (r) {
        result = r
      }
    }
  }
  return result;
}

const answer = findWrongInstruction()

console.log(answer)