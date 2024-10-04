// solution for recent interview problem I had solved:

// input org chart
ORG_CHART = {
    'John': {
        'Weston': undefined,
        'Jones': {
            'Paul': undefined
        }
    },
    'Lou': undefined
}
// given input name, want [name, 'manager' || 'ic', directReportsCount, indirectReportsCount]

// helperFxn
const getNumOfIndirectReports = (orgLevel, count = 0) => {
    if (!orgLevel) return 0;

    for (let employeeName in orgLevel) {
        console.log(employeeName)
        if (orgLevel[employeeName]) {
            count += getNumOfIndirectReports(orgLevel[employeeName], count) + 1
        }
    }


    return count;
}



// solved w recursion
const getEmployeeInfo = (employeeName, orgLevel) => {
// base case #1 out no futher orgLevels 
if (!orgLevel) {
    return [];
} else if (Object.keys(orgLevel).includes(employeeName)) {
    // base case #2 found employee
    // is manager
    if (orgLevel[employeeName]) {
        let numDirectReports = Object.keys(orgLevel[employeeName]).length;
        let numIndirectReports = getNumOfIndirectReports(orgLevel[employeeName]);
        
        return [employeeName, 'manager', numDirectReports, numDirectReports + numIndirectReports];
    } else {
        // is ic
        return [employeeName, 'ic', 0, 0]
    }
}

let finalResult;
for (let employeeName in orgLevel) {
    let result = getEmployeeInfo(employeeName, orgLevel[employeeName]);
    if (result.length > 0) finalResult = result;
}

return finalResult
}

console.log(getEmployeeInfo('Lou', ORG_CHART)) // expect ['Lou', 'ic', 0, 0]
console.log(getEmployeeInfo('John', ORG_CHART)) // expect ['John', 'manager', 2, 3]

// time/space - O(n) run time and constant space