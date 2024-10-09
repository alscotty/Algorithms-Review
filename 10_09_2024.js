'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'frequency' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING s as parameter.
 */

// input s which is the encoded string
// output is a number, the character counts of the decoded string, each place is essentially tied to the letters of the alphabet, so 26 places, ex return 1 a and nothing else 100000...n or xyyz n...000121
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const decodeString = (encodedString) => {
    let decodedString = '';
    let idx = 0;

    while (idx < encodedString.length) {
        // can have hashtag before () -> have to handle:
        // is #?
        let lookaheadIdx = idx + 2;
        if (encodedString[lookaheadIdx] && encodedString[lookaheadIdx] == '#') {
            console.log(Number(encodedString.slice(idx, idx + 2)))
            let letterIdx = Number(encodedString.slice(idx, idx + 2))
            console.log(`Adding: ${ALPHABET[letterIdx - 1]}`)
            decodedString += ALPHABET[letterIdx - 1];

            idx += 3;
            // is parens?
        } else if (encodedString[idx + 1] && encodedString[idx + 1] == '(') {
            let letterIdx = Number(encodedString[idx]);
            let timesToRepeat = Number(encodedString[idx + 2]);
            let reps = 0;
            while (reps < timesToRepeat) {
                decodedString += ALPHABET[letterIdx - 1];
                reps++
            }

            idx += 4;
            // else normal
        } else {
            let letterIdx = Number(encodedString[idx]);
            console.log(`Adding: ${ALPHABET[letterIdx - 1]}`)
            decodedString += ALPHABET[letterIdx - 1]
            idx++
        }

    }

    return decodedString;
}

const basicCounter = (letter, decodedString) => {
    let count = 0;

    for (let possibleLetter of decodedString) {
        if (possibleLetter == letter) count++;
    }

    return count;
}

function frequency(s) {
    let encodedString = s;
    let decodedString = decodeString(encodedString)
    console.log({ decodedString })
    let frequencyOutputString = "";

    for (let letter of ALPHABET) {
        frequencyOutputString += basicCounter(letter, decodedString);
    }

    // output is array[];
    return frequencyOutputString.split('');
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = frequency(s);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
