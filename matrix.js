/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
const isOutOfBounds = (sr,sc,height,width) => {
    return !(sr <= width && sr >= 0 && sc <=height && sc >=0)
}

var floodFill = function(image, sr, sc, color,visited) {
    if (!visited) visited = new Set();
    let height = image.length
    let width = image[0].length
    if(image[sr][sc] == 0 || isOutOfBounds(sr,sc,height,width)) return;
    if (visited.has[sr,sc]) return;
    
    image[sr][sc] = color
    coords = [sr,sc]
    visited.add(coords)
    console.log(visited)
    floodFill(image,sr+1,sc,color,visited)
    floodFill(image,sr-1,sc,color,visited)
    floodFill(image,sr,sc+1,color,visited)
    floodFill(image,sr,sc-1,color,visited)
    
    return image
};