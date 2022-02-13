/**
 * @param {string} sentence
 * @return {string}
 */

const goatify = (word,index) => {
    let vowels = "aeiouAEIOU";
    let startLetter = word[0];
    
    if (!vowels.includes(startLetter)) {
        word = word.slice(1) + word.slice(0,1)
    }
    word += "ma"
    
    while (index >= 0) {
        word += "a"
        index--;
    }
    
    return word;
}

const toGoatLatin = function(sentence) {
    return sentence.split(" ").map((word,index) => goatify(word,index)).join(" ")
};