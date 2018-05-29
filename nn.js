
//FUNCT DEFINE
var fs = require('fs');
var readCSV = function(fName){
    var fileVar =fs.readFileSync(fName, 'utf8').split('\n');
    return fileVar.map(function(thing){return thing.split(',').map(Number)})
}
var cont = function(){
process.stdin.once('data', function () {

});};

var ev= function(q){
    //return q;
    if (q%2 ==0){
        return 0;
    }
    return 1;
}
var nor = function(q){
    var reA = [];
    for(var i = 0; i< q.length; i++){
        if( q[i] > 0){
            reA.push(1);
        }
        else{reA.push(0);}
    }
    return reA;
}

var mi = function(a){
    if (a >0){return 1;}
    return 0;
}
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
    training_set_outputs[0].push(ev(j.shift()));
    training_set_inputs.push(j.map(mi));
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
    testOut[0].push(ev(j.shift()));
    testIn.push(j.map(mi));
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
var lol = 0;
for(;;){
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
    console.log("Epoch: ",lol);
    lol++;
    var acc = 0;
    var len = testIn.length-1;
    for (var k = 0; k< len-1; k++){
    //console.log(k);
    var predict = nj.sigmoid(nj.dot(nj.array(testIn[k]), synaptic_weights));
    if(predict.tolist()[0] === testOut[0][k]){acc++;};
    //console.log(predict.tolist()[0],  testOut[0][k]);

    }
    //commmented code
    console.log(acc/len);

}
//END TRAINING



/*
var acc = 0;
var len = testIn.length-1;
for (var k = 0; k< len-1; k++){
    //console.log(k);
    var predict = nj.sigmoid(nj.dot(nj.array(testIn[k]), synaptic_weights));
    if(predict.tolist()[0] === testOut[0][k]){acc++;};
    //console.log(predict.tolist()[0],  testOut[0][k]);

}
//commmented code
console.log(acc/len);
//console.log(acc,len);
//console.log(testOut);
*/
