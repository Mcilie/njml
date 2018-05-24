from numpy import exp, array, random, dot
#Numpy imports

training_set_inputs = array(
	[[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]])
training_set_outputs = array([[0, 1, 1, 0]]).T
#training set data

random.seed(1) #sets random seed
synaptic_weights = 2 * random.random((3, 1)) - 1
print(synaptic_weights)
for iteration in xrange(10000): # for loop EPOCHS
    output = 1 / (1 + exp(-(dot(training_set_inputs, synaptic_weights)))) # sigmoid
    synaptic_weights += dot(training_set_inputs.T, (training_set_outputs - output) * output * (1 - output))
print(1 / (1 + exp(-(dot(array([1, 0, 0]), synaptic_weights)))))
