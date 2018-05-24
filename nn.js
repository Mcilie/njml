var nj = require("numjs");
var training_set_inputs = nj.array([[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]]);
var training_set_outputs = nj.array([[0, 1, 1, 0]]).T;
var synaptic_weights = nj.subtract(nj.multiply(nj.random([3, 1]),2),1);
for(var i = 0; i<10000; i++){
	var output = nj.sigmoid(nj.dot(training_set_inputs,synaptic_weights));
	synaptic_weights = nj.add(
		synaptic_weights,nj.dot(
			training_set_inputs.T,
			nj.multiply(nj.subtract(training_set_outputs,output),
			nj.multiply(output, nj.subtract(nj.array([[1],[1],[1],[1]]),output))
			)
	))
	//synaptic_weights += dot(training_set_inputs.T, (training_set_outputs - output) * output * (1 - output))
}
console.log(nj.sigmoid(nj.dot(nj.array([1,0,0]), synaptic_weights)))

