const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8')

const regex = /(?=.*byr:)(?=.*iyr:)(?=.*eyr:)(?=.*hgt:)(?=.*hcl:)(?=.*ecl:)(?=.*pid:)/gs

const documents = data.split(/\n{2,}/gs)

const valid = documents.filter(doc => regex.test(doc))

console.log(valid.length)
// 213