const fs = require('fs');
let [rules, yourTicket, nearbyTickets] = fs
  .readFileSync('./input.txt', 'utf8')
  .split(/\n\n.*\n/g)
  .map(x => x.split(/\n/));

const { fields, ruleRanges } = rules.reduce(
  (acc, line) => {
    acc.fields.push(line.match(/.*(?=:)/)[0]);
    const ranges = [...line.matchAll(/(?<start>\d+)-(?<end>\d+)/g)];
    acc.ruleRanges.push(
      ranges.map(({ groups: { start, end } }) => ({
        min: start,
        max: end,
      }))
    );
    return acc;
  },
  { fields: [], ruleRanges: [] }
);

nearbyTickets = nearbyTickets.map(l => l.split(',').map(x => Number(x)));
const isValid = n =>
  ruleRanges.some(r => r.some(s => n >= s.min && n <= s.max));

nearbyTickets = nearbyTickets.filter(
  ticketValues => !ticketValues.some(v => !isValid(v))
);

const fieldsDict = fields.reduce(
  (acc, field) => ({ ...acc, [field]: true }),
  {}
);

const possibilities = fields.map(_ => ({ ...fieldsDict }));

nearbyTickets.forEach((ticketValues, k) => {
  ticketValues.forEach((v, i) => {
    ruleRanges.forEach((ranges, j) => {
      const valueIsValid = ranges.some(({ min, max }) => v >= min && v <= max);
      if (!valueIsValid) {
        possibilities[i][fields[j]] = false;
      }
    });
  });
});

const results = new Array(fields.length);

while (results.filter(x => x).length < results.length) {
  possibilities.forEach((p, i) => {
    const fieldOptions = Object.keys(p).filter(c => p[c]);
    if (fieldOptions.length === 1) {
      results[i] = fieldOptions[0];
      possibilities.forEach((q, j) => {
        if (i !== j) {
          delete q[fieldOptions[0]];
        }
      });
    }
  });
}

yourTicket = yourTicket[0].split(',').map(v => Number(v));

const departureValues = yourTicket.reduce(
  (acc, val, i) => (acc *= results[i].startsWith('departure') ? val : 1),
  1
);

console.log(departureValues, departureValues === 855275529001);
