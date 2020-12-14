const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/)

const bagsDict = data.reduce((acc, line) => {
  let [container, ...contained] = line.replace(/ bags?/g, '').split(/ contain |, /)
  acc[container] = acc[container] || {}
  contained.forEach((str) => {
    const color = str.replace(/^\d{1,} ?|\./g, '')
    if (color !== 'no other') {
      acc[container][color] = true
    }
  })
  return acc
}, {})

let checkedBags = {}
const doesBagEventuallyContainAShinyGoldBag = col => {
  if (bagsDict[col]['shiny gold']) {
    return true
  }
  checkedBags[col] = true
  const bagsToCheck = Object.keys(bagsDict[col]).filter(x => !checkedBags[x])
  if (!bagsToCheck?.length) {
    return false
  }
  return bagsToCheck.some(bag => doesBagEventuallyContainAShinyGoldBag(bag))
}

const count = Object.keys(bagsDict).reduce((acc, color) => {
  checkedBags = {}
  if (doesBagEventuallyContainAShinyGoldBag(color)) {
    return acc + 1
  }
  return acc
}, 0)

console.log(count)