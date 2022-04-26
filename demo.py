class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        size=len(mat) - 1
        diag_sum=0
        
        start_idx=0
        while start_idx <= size:
            x=start_idx
            primary_y=start_idx
            secondary_y=size-start_idx
            if primary_y == secondary_y:
                diag_sum+=mat[x][primary_y]
            else:
                diag_sum+=mat[x][primary_y]
                diag_sum+=mat[x][secondary_y]
            
            start_idx +=1
        
        
        return diag_sum
        
