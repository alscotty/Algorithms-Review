import re

# class Solution:
#     def reverseOnlyLetters(self, s: str) -> str:
#         if len(s) <= 1:
#             return s
#         
#         if re.search(r"[a-zA-Z]+",s[-1]):
#             print("normal case")
#             return s[-1] + self.reverseOnlyLetters(s[0:-1])
#         else:
#             print("Hit else case")
#             return self.reverseOnlyLetters(s[0:-1]) + s[-1]

# not quite working

class Solution:
    def reverseOnlyLetters(self, s: str) -> str:
        chars = "".join(re.findall(r"[a-zA-Z]+",s))
        reversed_chars = list(chars[::-1])
        print(reversed_chars)
        final_str=""
        
        for letter in s:
            if re.search(r"[a-zA-Z]+",letter):
                final_str += reversed_chars[0]
                reversed_chars= reversed_chars[1:]
            else:
                final_str += letter
        return final_str

solve = Solution()
print(solve.reverseOnlyLetters("a-bC-dEf-ghIj"))


#cleaner solution
class Solution(object):
    def reverseOnlyLetters(self, S):
        letters = [c for c in S if c.isalpha()]
        ans = []
        for c in S:
            if c.isalpha():
                ans.append(letters.pop())
            else:
                ans.append(c)
        return "".join(ans)