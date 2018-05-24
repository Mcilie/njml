//var method = Matrix.prototype;
module.exports = {
    Matrix : function(arrayOfNums) {
        this.matrix =arrayOfNums
    },
    MM : (M1, M2) => {
        var a = M1.matrix
        var b = M2.matrix
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
          m[r] = new Array(bNumCols); // initialize the current row
          for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
              m[r][c] += a[r][i] * b[i][c];
            }
          }
        }
        return new module.exports.Matrix(m);
      }
};




/*module.exports.Matrix.prototype.isValidMatrix = function () {
    var x = null;
    for(var i =0; i<this.matrix.length; i++){
        newX = this.matrix[i].length;
        if (newX !== x && x !== null){
            return false;
        }
        x = newX;
    }   
    return true;
}*/

