class Solution(object):
    def restoreString(self, s, indices):
        """
        :type s: str
        :type indices: List[int]
        :rtype: str
        """
        shuffled_letters_list = [None] * len(s)
        
        for idx in range(0,len(s)):
            letter = s[idx]
            new_pos = indices[idx]
            shuffled_letters_list[new_pos] = letter
        
        return "".join(shuffled_letters_list)
    
    
class Solution(object):
    def minTimeToVisitAllPoints(self, points):
        """
        :type points: List[List[int]]
        :rtype: int
        """
        time_total = 0
        
        for i in range(1, len(points)):
            x0, y0 = points[i - 1]
            x1, y1 = points[i]
            dx = abs(x1 - x0)
            dy = abs(y1 - y0)
            time_total += max(dx, dy)
        
        return time_total