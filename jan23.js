const formatString = (str) => {
    let properSpacedStr = '';

    for (let i = 0; i < str.length; i++) {
        if (!(str[i] == ' ' && str[i + 1] == ' ')) {
            properSpacedStr += str[i];
        }
    }

    return properSpacedStr.trim();
}

var reverseWords = function (input) {
    if (!input || input == []) return [];

    if (!Array.isArray(input)) {
        input = formatString(input).split(' ');
    }


    return input.reverse().join(' ');
};

function  myReverse(str){
    if (!str) return '';

    return myReverse(str.slice(1)) + str[0];
}

// console.log(myReverse('Hello'))