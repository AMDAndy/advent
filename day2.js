const input = document.querySelector('pre').textContent.trim().split('\n');
const arraySum = (arrayInput) => arrayInput.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);

// Convert X, Y, Z to A, B, C
const xToA = (letter) => String.fromCharCode(letter.charCodeAt(0) - 23);
const getCharValue = (char) => char - 64;
const prep = (hands) => numericHand(hands.map(hand => hand.split(' ')));
const getCharCode = (charac) => charac.charCodeAt(0)

const numericHand = ([opp, play]) => [getCharValue(getCharCode(opp)), getCharValue(getCharCode(xToA(play)))];
const numericHands = prep(input).map(hand => numericHand(hand.split(' ')));


const getResult = ([opp, player]) => {
    const shifted = xToA(player);
    if (opp == shifted ) {
        return 3;
    }
    else if ((opp == ROCK && shifted == SCISSORS) || (opp == SCISSORS && shifted == PAPER) || (opp == PAPER && shifted == ROCK)) {
        return 0;
    }
    else {
        return 6;
    }
}

const getLoss = (hand) => {
    switch (hand) {
        case ROCK:
            return SCISSORS;
            break;
        case PAPER:
            return ROCK;
            break;
        default:
            return PAPER;
            break;
    }
}

const result = arraySum(prep(input).map(round => getResult(round) + stylePoints(round[1])));

console.log(`Part 1: ${result}`);