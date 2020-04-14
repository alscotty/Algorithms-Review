function tripleThreat(a) {

    for (let i = 0; i < a.length - 2; i++) {
        if ((a[i] === a[i + 1] - 1) && (a[i] === a[i + 2] - 2)) {
            return 1;
        }
    }

    return 0;
}


function createPackage(small, big, goal) {
    if (goal === 0) return small;
    let origSmall = small

    while (big > 0 && goal >= 5) {
        goal = goal - 5;
        big--;
    }
    if (goal === 0) return origSmall - small;

    while (small > 0 && goal > 0) {
        goal = goal - 1;
        small--;
    }
    if (goal === 0) return origSmall - small;

    return -1
}
