// redo pascals triangle w/ recursion

const generatePascal = (numLevels, prevLevel = [1, 1]) => {
    if (numLevels == 1) {
        return [1]
    }
    else if (numLevels == 2) {
        return [[1], [1, 1]]
    }
    console.log({ prevLevel });

    let nextLevel = []
    for (let idx = 0; idx < prevLevel.length - 1; idx++) {
        nextLevel.push(prevLevel[idx] + prevLevel[idx + 1])
    }
    nextLevel = [1, ...nextLevel, 1]

    console.log({ nextLevel })

    let triangePiece = [...prevLevel, generatePascal(numLevels - 1, nextLevel)]
    return triangePiece
}

// console.log(generatePascal(1))
// console.log(generatePascal(2))
console.log(generatePascal(4))