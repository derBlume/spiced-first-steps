var follower = document.querySelector("#follower");
var playground = document.querySelector("#playground");
var dontTouch = document.querySelector("#dontTouch");
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var timerRunning;

function follow(event) {
    follower.style.left = event.pageX + "px";
    follower.style.top = event.pageY + "px";
}

function logTime(time) {
    if (timerRunning) {
        setTimeout(function () {
            timer.innerHTML = time / 100;
            logTime(time + 1);
        }, 10);
    }
}

playground.addEventListener("mouseenter", function () {
    playground.addEventListener("mousemove", follow);
});
playground.addEventListener("mouseleave", function () {
    playground.removeEventListener("mousemove", follow);
});

dontTouch.addEventListener("mouseenter", function () {
    if (timerRunning) {
        follower.style.backgroundColor = "red";
        timerRunning = false;
        setTimeout(function () {
            timer.innerHTML = "GAME OVER";
        }, 12);
    }
});
dontTouch.addEventListener("mouseleave", function () {
    follower.style.backgroundColor = "burlywood";
});

start.addEventListener("mouseenter", function () {
    follower.style.backgroundColor = "green";
    timerRunning = false;
});
start.addEventListener("mouseleave", function () {
    follower.style.backgroundColor = "burlywood";
    logTime(0);
});
start.addEventListener("click", function () {
    timerRunning = true;
    follower.style.backgroundColor = "yellow";
    if (Math.random() >= 0.5) {
        timer.innerHTML = "Run a circle CLOCKWISE!";
    } else {
        timer.innerHTML = "Run a circle ANTI-CLOCKWISE!";
    }
});

/* EXERCISE 2:
Make a page that has a <textarea> element on it. As the user types visible characters into this field, the characters should be replaced with the characters in the corresponding position in the Gettysburg Address. (Note - you can get and set the text in a <textarea> through its value property.) */

var textarea = document.querySelector("#textarea");
var replacement =
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.";

textarea.addEventListener("input", function () {
    textarea.value = replacement.slice(0, textarea.value.length);
});

console.log(textarea.value.length);

/* EXERCISE 3:
Make a page that has on it an element that is 100px by 100px in size and has a solid black border. When the user mouses down on this box, its background should change to a randomly selected color. When the user mouses up on it, its background should change to another randomly selected color. */

var colorfulDiv = document.querySelector("#colorfulDiv");

function generateRandomColor() {
    var i = Math.floor(Math.random() * 256);
    var j = Math.floor(Math.random() * 256);
    var k = Math.floor(Math.random() * 256);
    return "rgb(" + i + "," + j + "," + k + ")";
}

colorfulDiv.addEventListener("mousedown", function () {
    colorfulDiv.style.backgroundColor = generateRandomColor();
});

colorfulDiv.addEventListener("mouseup", function () {
    colorfulDiv.style.backgroundColor = generateRandomColor();
});

/* Exercise 4:
Make a page that has on it an element that is 200px by 200px in size and has a solid background color. Nest within that element another element that is 50px by 50px in size and has a different solid background color. When the user clicks on the outer element its background color should change to a randomly selected color. However, if the user clicks on the inner element, the inner element's background color should change to a randomly selected background color but the outer element's background color should not change at all. */

var inner = document.querySelector("#inner");
var outer = document.querySelector("#outer");

inner.addEventListener("click", function (event) {
    inner.style.backgroundColor = generateRandomColor();
    event.stopPropagation();
});

outer.addEventListener("click", function (event) {
    outer.style.backgroundColor = generateRandomColor();
    event.stopPropagation();
});
