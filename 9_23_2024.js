// is anagram, input string, return boolean answer

const isAnagram = (word) => {
    let lastIdx = word.length - 1;
    let midIdx = word.length/2;

    for (let idx = 0; idx < midIdx; idx++) {
        let leftChar = word[idx];
        let rightChar = word[lastIdx - idx];
        if (leftChar !== rightChar) return false;
    }

    return true;
}

// Test cases:
console.log(isAnagram('tacocat')) // true
console.log(isAnagram('word')) // false