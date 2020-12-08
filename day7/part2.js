const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/)

const bagColorDict = data.reduce((bagColorDict, line) => {
  let [container, ...contained] = line.replace(/ bags?/g, '').split(/ contain |, /)
  bagColorDict[container] ??= {}
  contained.forEach((str) => {
    const color = str.replace(/^\d{1,} ?|\./g, '')
    if (color !== 'no other') {
      const count = str.match(/^\d{1,}/)[0]
      bagColorDict[container][color] = parseInt(count)
    }
  })
  return bagColorDict
}, {})

const addContents = bagString => {
  let bagCount = 0
  const contents = Object.keys(bagColorDict[bagString]) || []
  contents.forEach(bag => {
    bagCount += bagColorDict[bagString][bag]
    bagCount += bagColorDict[bagString][bag] * addContents(bag)
  })
  return bagCount
}

const result = addContents('shiny gold')

console.log(result)