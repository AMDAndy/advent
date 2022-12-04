const input = document.querySelector('pre').textContent.trim().split('\n');
const splitString = (item) => [ item.slice(0, (item.length/2)), item.slice(item.length/2) ];
const intersect = (first, second) => Array.from(first).filter(x => Array.from(second).includes(x));
const getValue = (letter) =>
    letter.charCodeAt(0) - 96 > 0 ? letter.charCodeAt(0) - 96 : letter.charCodeAt(0) - 38;

function* chunkarray(arr, count) {
    for (let i = 0; i < arr.length; i += count) {
        yield arr.slice(i, i + count);
    }
}


const items = input.map(bag => new Set(intersect(splitString(bag)[0], splitString(bag)[1])));
const part1 = items.map(([item]) => getValue(item)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);


const groups = [...chunkarray(input, 3)];
const part2 = groups.map(([firstelf, secondelf, thirdelf]) =>
new Set(intersect(firstelf, intersect(secondelf, thirdelf)))).map(([letter]) => getValue(letter)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(`Part 1: ${part1}
Part 2: ${part2}`);