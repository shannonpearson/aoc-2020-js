const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8')

const answerCount = group => {
  const memberCount = (group.match(/\n/g) || []).length
  if (!memberCount) {
    return group.length
  }
  const string = group.replace(/\n/g, '').split('').sort().join('')
  const s =  "(.)(.*\\1){" + memberCount + "}"
  const regex = new RegExp(s, 'gs')
  return (string.match(regex) || []).length
}

const result = data.split(/\n{2,}/gs).reduce((acc, doc) => acc + answerCount(doc), 0)

console.log(result)
