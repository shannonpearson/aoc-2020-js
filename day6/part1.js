const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8')

const documents = data.split(/\n{2,}/gs).map(s => s.replace(/\n|(.)(?=.*\1)/gs, ''))

const count = documents.reduce((acc, d) => acc += d.length, 0)

console.log(count)