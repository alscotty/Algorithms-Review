class Solution(object):
    def generateMatrix(self, n):
        dirs = ["right","down","left","up"]
        
        start_arr = []
        for num in range(1,n+1):
            start_arr.append(num)
            
        matrix = [start_arr]
        num_rows_to_add = n-1
        added_count = 0
        
        while added_count < num_rows_to_add:
            matrix.append([0] * len(start_arr))
            added_count += 1
            
        
            
        
        
        return matrix
            
            
        
        
        """
        :type n: int
        :rtype: List[List[int]]
        """
        