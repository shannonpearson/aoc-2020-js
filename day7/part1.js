const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8').split(/\n/)

const bagColorDict = data.reduce((bagColorDict, line) => {
  let [container, ...contained] = line.replace(/ bags?/g, '').split(/ contain |, /)
  bagColorDict[container] = bagColorDict[container] || {}
  contained.forEach((str) => {
    const color = str.replace(/^\d{1,} ?|\./g, '')
    if (color !== 'no other') {
      bagColorDict[container][color] = true
    }
  })
  return bagColorDict
}, {})

let checkedBags = {}
const doesBagEventuallyContainAShinyGoldBag = bagDescriptionString => {
  if (bagColorDict[bagDescriptionString]['shiny gold']) {
    return true
  }
  checkedBags[bagDescriptionString] = true
  const bagsToCheck = Object.keys(bagColorDict[bagDescriptionString]).filter(x => !checkedBags[x])
  if (!bagsToCheck?.length) {
    return false
  }
  return bagsToCheck.some(bag => doesBagEventuallyContainAShinyGoldBag(bag))
}

const count = Object.keys(bagColorDict).reduce((acc, color) => {
  checkedBags = {}
  if (doesBagEventuallyContainAShinyGoldBag(color)) {
    return acc + 1
  }
  return acc
}, 0)

console.log(count)