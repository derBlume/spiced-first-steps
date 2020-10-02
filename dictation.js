var x;
var doubleX;

x = 42;

function timesTwo(num) {
    return num * 2;
}

doubleX = timesTwo(x);

var numbers;

numbers = [x, doubleX];

for (var i of numbers) {
    console.log(i);
}

numbers = {};

numbers.y = doubleX;
