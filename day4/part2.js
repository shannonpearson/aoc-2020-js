const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf8')

const regex = /(?=.*\bbyr:(200[0-2]|19[2-9]\d)\b)(?=.*\biyr:20(1\d|20)\b)(?=.*\beyr:20(2\d|30)\b)(?=.*\bhgt:(1([5-8]\d|9[0-3])cm|(59|6[0-9]|7[0-6])in)\b)(?=.*\bhcl:#[\da-f]{6}\b)(?=.*\becl:(amb|blu|brn|gry|grn|hzl|oth)\b)(?=.*\bpid:\d{9}\b)/gs

const documents = data.split(/\n{2,}/gs)

const valid = documents.filter(doc => regex.test(doc))

console.log(valid.length)

// 147