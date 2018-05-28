
//FUNCT DEFINE
var fs = require('fs');
var readCSV = function(fName){
    var fileVar =fs.readFileSync(fName, 'utf8').split('\n');
    return fileVar.map(function(thing){return thing.split(',').map(Number)})
}
var cont = function(){
process.stdin.once('data', function () {

});};

//END FUNCT DEFINE


//READ CSV
var csv = require('csv');
var obj = csv();
var MyData = readCSV('/Users/michaelilie/Desktop/mnist_train.csv');
//END READ CSV


//CONVERT CSV TO NUMS
var training_set_inputs = [];
var training_set_outputs = [[]];

for (var i = 0; i < MyData.length; i++){
    var j = MyData[i];
    //var q = j.pop();
    training_set_outputs[0].push(j.pop());
    training_set_inputs.push(j);
}
//END CONVERT CSV TO NUMS


//READ TEST CSV
var TestData = readCSV('/Users/michaelilie/Desktop/mnist_test.csv');
//END READ TEST CSV


//DEBUG
//END DEBUG



//CONVERT CSV TO NUMS TESTING
var testIn= [];
var testOut= [[]];

for (var i = 0; i < TestData.length; i++){
    var j = TestData[i];
    testOut[0].push(j.pop());
    testIn.push(j);
}
//END CONVERT CSV TO NUMS TESTING

var GLength = training_set_inputs.length;
//IMPORTS AND INIT
var nj = require("numjs");
training_set_inputs = nj.array(training_set_inputs);
training_set_outputs = nj.array(training_set_outputs).T;
var synaptic_weights = nj.subtract(nj.multiply(nj.random([28*28, 1]),2),1);
//END IMPORTS AND INIT

//console.log(training_set_inputs.tolist());
//console.log(synaptic_weights.tolist());
//TRAINING
for(var i = 0; i<10; i++){
	var output = nj.sigmoid(nj.dot(training_set_inputs,synaptic_weights));
	synaptic_weights = nj.add(
		synaptic_weights,nj.dot(
			training_set_inputs.T,
			nj.multiply(nj.subtract(training_set_outputs,output),
			nj.multiply(output,
                nj.subtract(
                    nj.ones([GLength,1]),output)
                )
			)
	))
}
//END TRAINING




var acc = 0;
var len = testIn.length-1;
console.log(testIn);
console.log(testOut);
for (var k = 0; k< len-1; k++){
    //console.log(k);
    //var predict = nj.sigmoid(nj.dot(nj.array(testIn[k]), synaptic_weights));

}
//commmented code
//console.log(acc/len);
//console.log(testOut);

