//EXERCISE 1: a function that accepts any number of arguments and returns their sum

function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total = total + arguments[i];
    }
    return total;
}

console.log(sum(5, 10));
console.log(sum(5, 10, 15));
console.log(sum(5, 10, 15, 100, 200));

//EXERCISE 2: a function that takes another function as an argument.
//            It should wait 1.5 seconds and then run the function that was passed in

function waitThenRun(passedFunction) {
    return setTimeout(passedFunction, 1500);
}

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    }); // logs 'Goodbye!' 1.5 seconds later
});

//EXERCISE 3: a function that expects a number as an argument. If the value that is passed in is less than 0, equal to 0, or not a number, the function should return the string 'ERROR'. If the number that is passed in is greater than or equal to 1000000 it should simply return the number. Otherwise it should multiply the number by 10 however many times it takes to get a number that is greater than or equal to 1000000 and return that.

function makeMeMillionaire(investment) {
    if (investment <= 0 || isNaN(investment)) {
        return "ERROR";
    } else if (investment >= 1000000) {
        return investment;
    } else {
        return makeMeMillionaire(10 * investment);
    }
}

console.log(makeMeMillionaire(NaN));
console.log(makeMeMillionaire(0));
console.log(makeMeMillionaire(-3));
console.log(makeMeMillionaire("a lot"));
console.log(makeMeMillionaire(1000000));
console.log(makeMeMillionaire(5));

//BONUS EXERCISE: Write a function that returns a function that can be called repeatedly and passed a number each time. Each time it is called it should return the sum of the number that is passed in and all other numbers that were passed in previous calls. That is, it should return the sum of all the numbers that were ever passed to it.

function getTotaler() {
    var sum = 0;
    return function (input) {
        sum = sum + input;
        return sum;
    };
}

var totaler = getTotaler();

console.log(totaler(1)); //1
console.log(totaler(2)); //3
console.log(totaler(5)); //8
