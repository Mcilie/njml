var nml = require('./index');
var q = new nml.matrix.Matrix(
    [
        [3],
        [4]
    ])

var x = new nml.matrix.Matrix(
    [
        [34,45],
    ])

console.log(nml.matrix.MM(x,q));