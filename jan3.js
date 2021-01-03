// tabulation practice: 
// given a word, return true/false if that word can be broken up/composed of a series of words from a word dictionary:

const isWordInDict = (word,wordDict) => {
    let table = new Array(word.length + 1).fill(false);
    table[0] = true;

    for (let i = 0; i < table.length; i++){
        if (table[i] == false) continue;

        for(let j = i + 1; j<word.length; j++){
            if (wordDict.includes(word.slice(i,j+1))){
                table[j+1] = true;
            }
        }
    }
    console.log(table)
    return table[table.length - 1];
}

// let word = 'facebook';
// let wordDict = ['face','book'];
// let word = 'apple';
// let wordDict = ['app','appl'];
console.log(isWordInDict(word,wordDict))

