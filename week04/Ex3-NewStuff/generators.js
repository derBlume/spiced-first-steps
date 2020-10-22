function* fizzbuzz() {
    for (var i = 1; i <= 100; i++) {
        if (i % 3 == 0) {
            if (i % 5 == 0) {
                yield "fizzbuzz";
            } else {
                yield "fizz";
            }
        } else {
            if (i % 5 == 0) {
                yield "buzz";
            } else {
                yield i;
            }
        }
    }
}

for (let num of fizzbuzz()) {
    console.log(num);
}

/* Write a generator function that expects to be passed an array of values. When next is called on the iterator object that this function returns, the values in the array should be yielded in reverse order. The array that is passed to the generator function should stay in its original order. */

let array = [1, 2, 3, 4, 5];

function* reverse(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        yield array[i];
    }
}

for (let item of reverse(array)) {
    console.log(item);
}

console.log(array);

/* Write a function that returns an array containing all the values passed to it in the order in which they are passed. When the spread operator is used on this array, the values in the array should be produced in reverse order. */

function makeWeirdArray(array) {
    array[Symbol.iterator] = function* () {
        for (let i = array.length - 1; i >= 0; i--) {
            yield array[i];
        }
    };
    return array;
}

const aWeirdArray = makeWeirdArray([1, 2, 3]);

console.log(aWeirdArray[0], aWeirdArray[1], aWeirdArray[2]);
console.log([...aWeirdArray]);
