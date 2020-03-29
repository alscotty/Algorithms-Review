
def squaragonal?(grid)
    left_diag=[]
    right_diag=[]

    size=grid.length

    (0...size).each do |idx|
            left_diag << grid[idx][idx]
            right_diag << grid[idx][size-1-idx]
    end
 
    left_diag.all? {|el| el == left_diag[0]} ||  right_diag.all? {|el| el == right_diag[0]}
end

p squaragonal?([
    [:x, :y, :o],
    [:x, :x, :x],
    [:o, :o, :x],
]) #true

p squaragonal?([
    [:x, :y, :o],
    [:x, :o, :x],
    [:o, :o, :x],
]) #true

p squaragonal?([
    [:x, :y, :o],
    [:x, :y, :x],
    [:o, :o, :x],
]) #false