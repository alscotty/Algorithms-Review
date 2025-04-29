class Solution(object):
    def licenseKeyFormatting(self, s, k):
        """
        :type s: str
        :type k: int
        :rtype: str
        """
        # Step 1: Remove all dashes and convert to uppercase
        clean_s = s.replace("-", "").upper()
        
        # Step 2: Build the new formatted string in reverse
        result = []
        for i in range(len(clean_s)):
            if i > 0 and i % k == 0:
                result.append("-")
            result.append(clean_s[-(i + 1)])
        
        # Step 3: Reverse the result list and join it into a string
        return ''.join(reversed(result))
