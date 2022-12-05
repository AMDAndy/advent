
function* chunkarray(arr, count) {
    for (let i = 0; i < arr.length; i += count) {
        yield arr.slice(i, i + count);
    }
}
const getInput = () => document.querySelector('pre').textContent.trim().split('\n\n');
// Create object with keys matching 1-9
const firstHalf = getInput()[0].split('\n').reverse();
const keys = firstHalf.shift().split(' ').filter(a => a !=='').map(ind => parseInt(ind));
const cols = {};
const fastCols = {};
// Add arrays as properties to the columns object.
const setCols = (obj => keys.forEach(key => obj[key] = []));
setCols((cols));
setCols((fastCols));
// Get interesting indexes
const splitLines = firstHalf.map(line => [...chunkarray([...line], 4)]);
const addInitial = (obj) => splitLines.forEach((line) => {
    line.forEach((item, index) => item[1] !== ' ' && obj[index + 1].push(item[1]));
});
addInitial(cols);
addInitial(fastCols);
const instructions = getInput()[1];
const prep = ((inst) => inst.split('\n').map(line => line.split(' ')));
const execute = ([action, movements, fr, start, to, end]) => {
    console.log(`${action} ${movements} items ${fr} column ${start} ${to} column ${end}`);
    for (let i = 0; i < movements; i++) {
        // console.log(i);
        const item = cols[start].pop();
        cols[end].push(item);
    }
}
const executeFaster = ([action, movements, fr, start, to, end]) => {
    // console.log(`${action} ${movements} items ${fr} column ${start} ${to} column ${end}`);
    const temp = [];
    for (let i = 0; i < movements; i++) {
        // console.log(i);
        const item = fastCols[start].pop();
        temp.unshift(item);
    }
    temp.forEach((item) => fastCols[end].push(item));
}


prep(instructions).forEach(instruction => execute(instruction));
console.log('Part 1:')
for (const prop in cols) {
    console.log(`column ${prop}: ${cols[prop].pop()}`)
}

prep(instructions).forEach(instruction => executeFaster(instruction));
console.log('Part 2:')
for (const prop in fastCols) {
    console.log(`column ${prop}: ${fastCols[prop].pop()}`)
}
