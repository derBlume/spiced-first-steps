/* EXERCISE 1:
 Write a constructor called Rectangle that accepts two numbers (width and height) as parameters. Rectangle instances should have a method called getArea that returns the instance's width multiplied by its height. Write another constructor called Square that accepts one number (which will serve as both width and the height) as a parameter. Instances of Square should also have a getArea method but you should not rewrite the getArea function you wrote for Rectangle. Square instances should use the same getArea method that Rectangle instances do. */

var shape = {
    getArea: function () {
        return this.width * this.height;
    },
};

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

function Square(width) {
    this.width = width;
    this.height = width;
}

Square.prototype = shape;
Rectangle.prototype = shape;

var square = new Square(4);
console.log(square.getArea()); //16

var rect = new Rectangle(4, 5);
console.log(rect.getArea()); //20

/* EXERCISE 2:
Write a function called invertCase that expects a string as a parameter. This function should return a new string with all the same characters as the string that was passed in but with the cases of the alphabetic characters switched. Uppercase characters should become lowercase and lowercase letters should become uppercase. Characters that are not alphabetic should not change. The toUpperCase and toLowerCase methods that all strings have will come in handy here. */

function invertCase(string) {
    var newString = [];
    for (var i in string) {
        if (string[i].toUpperCase() === string[i]) {
            newString[i] = string[i].toLowerCase();
            /* console.log(string[i], 1); */
        } else {
            newString[i] = string[i].toUpperCase();
            /* console.log(string[i], 2); */
        }
    }
    return newString.join("");
}

var string1 = "3, 2, 1 KOPF hoch!";
var string2 = invertCase(string1);

console.log(string1);
console.log(string2);

/* BONUS EXERCISE:
Write a constructor called Countdown that accepts a single argument - the number of seconds to count down. It should be possible to call the start method of instances of Countdown to initiate the countdown. Once the countdown starts, it should count down to zero starting with the number that was passed to the constructor and logging each number to the console with a one second delay. */

function Countdown(time) {
    this.start = function () {
        function simpleCountdown(timeLeft) {
            if (timeLeft >= 0) {
                setTimeout(function () {
                    console.log(timeLeft);
                    simpleCountdown(timeLeft - 1);
                }, 1000);
            }
        }
        simpleCountdown(time);
    };
}

var countdownFrom5 = new Countdown(5);

countdownFrom5.start();

/* function simpleCountdown(time) {
    if (time >= 0) {
        setTimeout(function () {
            console.log(time);
            simpleCountdown(time - 1);
        }, 1000);
    }
} */

//simpleCountdown(5);
