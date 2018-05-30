//FUNCT DEFINE
var fs = require('fs');
var readCSV = function(fName){
    var fileVar =fs.readFileSync(fName, 'utf8').split('\n');
    return fileVar.map(function(thing){return thing.split(',').map(Number)})
}

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
    //return a
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
    training_set_outputs[0].push(j.shift());
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
var rowTcoll = a => {
    retArr = [];
    var d = a.tolist();
    for (var e = 0; e < d.length; e++){
        retArr.push(d[e][0]);
    }
    return retArr;
}

for (var i = 0; i < TestData.length; i++){
    var j = TestData[i];
    testOut[0].push(ev(j.shift()));
    testIn.push(j.map(mi));
}


var sy = require("synaptic");

// create the network
var inputLayer = new sy.Layer(28*28);
var hiddenLayer = new sy.Layer(28);
var outputLayer = new sy.Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new sy.Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

// train the network
var learningRate = .3;
for (var i = 0; i < 3; i++)
{
    console.log(i);

    for(var j = 0; j<MyData.length; j++){
        //console.log(j);
        myNetwork.activate(training_set_inputs[j]);
        myNetwork.propagate(learningRate, [training_set_outputs[0][j]]);
    }
}

var f = 0
var h = TestData.length

for(var j = 0; j< TestData.length; j++){
        var d = myNetwork.activate(testIn[j]);
        var c = testOut[0][j]
        console.log(d,c);
        if (d[0] === c){f++}


        //myNetwork.propagate(learningRate, training_set_inputs[0][j]);
    }
console.log(f/h)


