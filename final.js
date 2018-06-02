const mnist = require('mnist');

const set = mnist.set(50000, 5000);

const trainingSet = set.training;
const testSet = set.test;
const synaptic = require('synaptic');

const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;

const inputLayer = new Layer(784);
const hiddenLayer = new Layer(100);
const outputLayer = new Layer(10);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});
 const trainer = new Trainer(myNetwork);
trainer.train(trainingSet, {
    rate: .1,
    iterations: 200,
    error: .1,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
});
console.log(myNetwork.activate(testSet[0].input));
console.log(testSet[0].output);
var exported = myNetwork.toJSON();
const fs = require('fs');
const content = JSON.stringify(exported);

fs.writeFile("/home/mcist-9013/NNIMPORTANT.TXT", content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
