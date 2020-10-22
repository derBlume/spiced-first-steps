const url = require("url");
const querystring = require("querystring");
const countdown = require("./countdown.js");

const input = url.parse(process.argv[2]);

function talkAboutUrl() {
    console.log("The protocol is", input.protocol);
    console.log("The host is", input.host);
    console.log("The hostname is", input.hostname);
    console.log("The port is", input.port);
    console.log("The pathname is", input.pathname);
    console.log("The query is", input.query);

    let obj = querystring.parse(input.query);
    for (let i in obj) {
        console.log("The value of the", i, "parameter is", obj[i]);
    }
}

talkAboutUrl();
const ct = new countdown.Countdown(5);

ct.start();
