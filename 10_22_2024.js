/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = (cpdomains) => {
    let seenDomains = {
        
    }
    
    for (let cpDomainString of cpdomains) {
        let domainString = cpDomainString.split(' ')[1];
        let seenCount = Number(cpDomainString.split(' ')[0]);
        
        while (domainString.length > 0) {
            if (seenDomains[domainString]) {
                seenDomains[domainString] += seenCount
            } else {
                seenDomains[domainString] = seenCount
            } 
            
            let domainSplit = domainString.split('.');
            domainSplit.shift();
            domainString = domainSplit.join('.')
        }
        
    }
    
    let finalArray = []
    for (let domain in seenDomains) {
        let visitedCount = seenDomains[domain];
        finalArray.push(`${visitedCount} ${domain}`)
    }
    
    return finalArray;
};


/**
 * @param {number[]} nums
 * @return {number}
 */
const repeatedNTimes = function(nums) {
    const n = nums.length/2.0;
    let seenHash = {}
    
    for (let num of nums) {
        if (seenHash[num]) {
            seenHash[num]++;
        } else {
            seenHash[num] = 1
        }
    }
    
    for (let number in seenHash) {
        if(seenHash[number] == n) return Number(number);
    }
};


/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * Binary Search type problem:
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = function(isBadVersion, maxNum, minNum = 0) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
        let middleNum = Math.min((maxNum - minNum)/2);
    console.log(`Checking for number:${middleNum}`)
        let isCurrentVersionBad = isBadVersion(middleNum)
        
        if ((middleNum==1 && (isCurrentVersionBad == true)) || (isCurrentVersionBad == true && isBadVersion(middleNum-1) == false)) {
            return middleNum;
        }
        
        if (isCurrentVersionBad) {
            return solution(isBadVersion, middleNum, 0)
        } else {
            return solution(isBadVersion, maxNum, middleNum)
    };
};