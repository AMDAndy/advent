// Get input and split it up into rows.
const assignments = document.querySelector('pre').textContent.trim().split('\n');

// Split up each line into two arrays of two items.
const prep = (assignment) => assignment.split(',').map(half => half.split('-'));

// Create an array given a start and end.
const createRange = (first, last, step = 1) =>
    Array.from({ length: (last - first) / step + 1 }, (nothing, i) => first + i * step);
const intersect = (arrayA, arrayB) => arrayA.filter(x => arrayB.includes(x));

// First part. See if one completely overlaps.
const compareHalves = (assignment) => {
    const [first, second] = prep(assignment);
    if ((parseInt(first[0]) <= parseInt(second[0])  && parseInt(second[1]) <= parseInt(first[1])) ||
        (parseInt(second[0]) <= parseInt(first[0]) && parseInt(first[1]) <= parseInt(second[1]))) {
        return true;
    }
    else {
        return assignment;
    }
}

// Second part. See if they intersect at all.
const subsetHalves = (assignment) => {
    const ranges = prep(assignment);
    const groups = ranges.map(range => createRange(parseInt(range[0]), parseInt(range[1])));
    return intersect(groups[0], groups[1]).length > 0 ? true : false;
}

console.log(`first part: ${assignments.map(assignment => compareHalves(assignment)).filter(item => item === true).length}`);
console.log(`second part: ${assignments.map(assignment=> subsetHalves(assignment)).filter(item => item === true).length}`);