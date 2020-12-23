const fs = require('fs');
const [rules, nearbyTickets] = fs
  .readFileSync('./input.txt', 'utf8')
  .split(/\n\n.*\n\n.*:\n/gs)
  .map(x => x.split(/\n/));

const ruleRanges = rules.reduce((acc, line) => {
  const ranges = [...line.matchAll(/(?<start>\d+)-(?<end>\d+)/g)];
  ranges.forEach(range => {
    acc.push({ min: range.groups.start, max: range.groups.end });
  });
  return acc;
}, []);

const nearbyTicketValues = nearbyTickets.flatMap(l =>
  l.split(',').map(x => Number(x))
);

const isValid = n => ruleRanges.some(({ min, max }) => n >= min && n <= max);

const invalidCount = nearbyTicketValues.reduce(
  (acc, v) => (isValid(v) ? acc : acc + v),
  0
);

console.log(invalidCount);
