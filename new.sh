day=$1
mkdir "day${day}"
touch "day${day}/input.txt"
echo -e "const fs = require('fs');\nconst data = fs.readFileSync('./input.txt', 'utf8').split(/\\\\n/);" | tee "day${day}/part1.js" "day${day}/part2.js"