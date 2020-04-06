a = [[1,2],[3,4]]

# p a.transpose

def rotate(matrix)
    
    size = matrix.length
    
    (0...matrix.length).each do |row_idx|
        (0...matrix.length).each do |col_idx|
            return matrix.reverse! if row_idx == size/2 && col_idx == size/2 && size.odd?
            
            current_el = matrix[row_idx][col_idx]
            swapped_el = matrix[size - col_idx-1][size - row_idx-1]
            matrix[row_idx][col_idx] = swapped_el
            matrix[size - col_idx-1][size - row_idx-1] = current_el

            if row_idx == (size/2)-1 && col_idx == size-1 && size.even?
                p "row: #{row_idx}, col: #{col_idx}"
                return matrix.reverse! 
            end
        end
    end
        
end
