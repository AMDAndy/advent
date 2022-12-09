const lines = document.querySelector('pre').textContent.split('\n')
const directoryStructure = {
    '/': {}
};
let currentPath = [];
const smallPaths = {};
const arraySum = (arrayInput) => arrayInput.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);

const parseInstruction = (instruction) => {
    if (instruction[0] == 'ls') {
        return;
    }
    else {
        changeDirectory(instruction[1]);
    }
}

const changeDirectory = (directory) => {
    if (directory == '..') {
        currentPath.pop();
    }
    else {
        currentPath.push(directory);
    }
}

const getDirectory = () => {
    let tempDirectory = directoryStructure;
    for (const item of currentPath) {
        tempDirectory = tempDirectory[item];
    }
    return tempDirectory;
}

const createDir = (dirName) => {
    const directory = {};
    const currentDir = getDirectory();
    currentDir[dirName] = directory;
    currentDir[dirName].files = 0;
}

const createFile = (fileSize) => {
    getDirectory().files += parseInt(fileSize);
}

const parseLines = (lines) => {
// Parse each command.
    lines.forEach(line => {
        const parts = line.split(' ');
        const firstPart = parts.shift();
        switch (firstPart) {
            case '$':
                parseInstruction(parts);
                break;
            case 'dir':
                createDir(parts[0]);
                break;
            default:
                createFile(firstPart);
        }
    })
}

const isSmall = (size) => size <= 100000 ? true : false;
const traverse = (directory, dirName, path) => {
    const currentPath = path + dirName;
    if (directory.hasOwnProperty('files')) {
        if (isSmall(directory.files)) { smallPaths[currentPath] = directory.files; }
    }
    for (const property in directory) {
        if (property !== 'files') {
            traverse(directory[property], property, currentPath);
        }
    }
}
parseLines(lines);
traverse(directoryStructure, '', '');
const subs = {}
for (const directory in smallPaths) {
    let size = smallPaths[directory];
    for (const subdirectory in smallPaths) {
        if (subdirectory.includes(directory) && subdirectory !== directory) {
            size += smallPaths[subdirectory];
        }
    }
    if (size !== 0 && isSmall(size)) {
        subs[directory] = size;
    }
}
const subsKeys = Object.keys(subs);
let answer = 0;
for (const directory in subs) {
    const subdirectories = subsKeys.filter(s => s.includes(directory) && s !== directory);
    subdirectories.forEach(directory => delete subs[directory]);
}
for (const directory in subs) {
    answer += subs[directory];
    console.log(answer)
}
console.log(answer);