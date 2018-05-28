var csv = require('csv');
var obj = csv();
var MyData = [];
obj.from.path('/Users/michaelilie/Desktop/mnist_train.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        MyData.push(data[index]);
    }
    console.log(MyData);
});
