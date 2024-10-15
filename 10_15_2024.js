/**
 * @param {string} s
 * @return {boolean}
 * basic parenthesis/brackets validator using a stack
 */
const isValid = function (s) {
    let leftParensOptions = ['(', '{', '[']

    let stack = [];

    for (paren of s) {
        let prevParen = stack[stack.length - 1];

        if (leftParensOptions.includes(paren)) {
            stack.push(paren);
        } else if (prevParen) {
            if ((paren == ')' && prevParen == '(') || (paren == ']' && prevParen == '[') || (paren == '}' && prevParen == '{')) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            return false
        }
    }

    return stack.length === 0;
};