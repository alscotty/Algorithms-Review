/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const isItemDivisible = (divisorStr, fullStr) => {
    let concatStr = '';
    while (concatStr.length < fullStr.length) {
        concatStr += divisorStr;
    }
    return concatStr == fullStr
}

const gcdOfStrings = function (str1, str2) {
    let minStr = str1.length < str2.length ? str1 : str2;

    let maxSharedStr = '';
    let idx = 0;
    while (idx < minStr.length) {
        let testStr = minStr.slice(0, idx+1);

        if (isItemDivisible(testStr, str1) && isItemDivisible(testStr, str2)) {
            maxSharedStr = testStr;
            idx++;
        } else {
            idx++
        }
    }

    return maxSharedStr;
};