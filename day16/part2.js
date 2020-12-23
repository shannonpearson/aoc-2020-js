const fs = require('fs');
let [rules, yourTicket, nearbyTickets] = fs
  .readFileSync('./input.txt', 'utf8')
  .split(/\n\n.*\n/g)
  .map(x => x.split(/\n/));

const fields = [];
const ruleRanges = rules.reduce((acc, line) => {
  const title = line.match(/.*(?=:)/)[0];
  fields.push(title);
  const ranges = [...line.matchAll(/(?<start>\d+)-(?<end>\d+)/g)];
  acc.push([
    title,
    ...ranges.map(range => ({
      min: range.groups.start,
      max: range.groups.end,
    })),
  ]);
  return acc;
}, []);

nearbyTickets = nearbyTickets.map(l => l.split(',').map(x => Number(x)));
const isValid = n => {
  return ruleRanges.some(r => {
    return r.some(s => {
      return s.hasOwnProperty('max') ? n >= s.min && n <= s.max : false;
    });
  });
};
nearbyTickets = nearbyTickets.filter(
  ticketValues => !ticketValues.some(v => !isValid(v))
);

const fieldsDict = fields.reduce(
  (acc, field) => ({ ...acc, [field]: true }),
  {}
);

const possibilities = new Array(fields.length);
for (let i = 0; i < possibilities.length; i++) {
  possibilities[i] = { ...fieldsDict };
}

nearbyTickets.forEach((ticketValues, k) => {
  ticketValues.forEach((v, i) => {
    ruleRanges.forEach(([title, ...ranges], j) => {
      const valueIsValid = ranges.some(({ min, max }) => v >= min && v <= max);
      if (!valueIsValid) {
        possibilities[i][title] = false;
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

console.log(departureValues === 855275529001);
