const inputText = document.querySelector('pre').textContent.trim();
const inputArray = [...inputText];
const fourChars = [];
const fourteenChars = [];
let answer = '';
let answer2 = '';
for (const char of inputArray) {
    fourChars.push(char);
    if (fourChars.length > 4) {
        fourChars.shift();
    }
    if (fourChars.length == 4) {
        const charSet = new Set(fourChars);
        if (charSet.size == fourChars.length) {
            console.log(fourChars.join(""));
            const marker = fourChars.join("");
            const processed = inputText.split(fourChars.join(''))[0] + marker;
            answer = [...processed].length;
            break;
        }
        else {
            fourChars.shift();
        }
    }
}
for (const char of inputArray) {
    fourteenChars.push(char);
    if (fourteenChars.length > 14) {
        fourteenChars.shift();
    }
    if (fourteenChars.length == 14) {
        const charSet = new Set(fourteenChars);
        if (charSet.size == fourteenChars.length) {
            console.log(fourteenChars.join(""));
            const marker = fourteenChars.join("");
            const processed = inputText.split(fourteenChars.join(''))[0] + marker;
            answer2 = [...processed].length;
            break;
        }
        else {
            fourteenChars.shift();
        }
    }
}
console.log(`Part 1: ${answer}`);
console.log(`Part 2: ${answer2}`);