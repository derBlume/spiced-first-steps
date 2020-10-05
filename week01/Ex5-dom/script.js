/* EXERCISE 1:
Write a function that expects a string representing a selector to be passed as a parameter. The function should find all the elements in the document that match the selector and change their style so that the text they contain is italic, underlined, and bold. */

//alert("Check");

function emphasize(selector) {
    var selected = document.querySelectorAll(selector);
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.add("emphasized");
    }
}

//emphasize(".africa");

setTimeout(function () {
    emphasize(".africa");
}, 1500);

/* EXERCISE 2:
Write a function that expects a string representing a class name to be passed as a parameter. The function should return an array containing all the elements in the document that have the class that was passed in. */

function returnArray(selector) {
    var selected = document.querySelectorAll(selector);
    var array = [];
    for (var i = 0; i < selected.length; i++) {
        array.push(selected[i]);
    }
    return array;
}

console.log(returnArray(".africa"));

/* EXERCISE 3:
Write a function that inserts an element into the body of the currently loaded page. That element should have fixed position, z-index of 2147483647, left of 20px, top of 100px, font-size of 200px, and contain the text 'AWESOME'. */

function insertAwesomeness() {
    var body = document.querySelector("body");
    var awesomeness = document.createElement("h1");
    awesomeness.innerHTML = "AWESOME";
    awesomeness.classList.add("awesomeStyle");
    body.append(awesomeness);
}

insertAwesomeness();
