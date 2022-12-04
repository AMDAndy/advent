const input = document.querySelector('pre').textContent.trim();

const prep = (bags) => input.split('\n\n').map(bag => bag.split('\n'));

const arraySum = (arrayInput) => arrayInput.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);

const reverseSort = (arrayInput) => arrayInput.sort().reverse();
const sumBags = (bags) => bags.map(bag => arraySum((bag)));

const processedBags = reverseSort(sumBags(prep(input)));
const firstResult = processedBags[0];
const secondResult = arraySum(processedBags.slice(0, 3));

console.log(`first part ${firstResult}`);
console.log(`second result ${secondResult}`);