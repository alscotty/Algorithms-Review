import re

class Solution:
    
    def isPalindrome(self, s: str) -> bool:
        matches = re.findall(r"[a-zA-Z0-9]+", s)
        formatted = "".join(matches).lower()
        
        return formatted == formatted[::-1]
    
    
    def validPalindrome(self, s: str) -> bool:
        if self.isPalindrome(s):
            return True
        
        for idx in range(0,len(s)):
            test = s[0:idx] + s[idx+1:]
            if self.isPalindrome(test):
                return True
        
        
        return False