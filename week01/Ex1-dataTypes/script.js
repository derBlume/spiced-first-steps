function logType(checkThis) {
    if (typeof checkThis === "number") {
        //could be a number or NaN
        if (isNaN(checkThis)) {
            console.log("not a number!");
        } else {
            console.log("number!");
        }
    } else if (typeof checkThis === "bigint") {
        console.log("bigint!");
    } else if (typeof checkThis === "undefined") {
        console.log("undefined!");
    } else if (typeof checkThis === "boolean") {
        console.log("boolean!");
    } else if (typeof checkThis === "string") {
        console.log("string!");
    } else if (typeof checkThis === "function") {
        console.log("function!");
    } else if (typeof checkThis === "object") {
        //could be Null, Object or Array!
        if (checkThis === null) {
            console.log("null!");
        } else if (Array.isArray(checkThis)) {
            console.log("array!");
        } else {
            console.log("object!");
        }
    } else {
        console.log("I have no idea!");
    }
}

logType("bla" / 2); // NaN
logType(2); // number
logType("2"); // string
logType("bla"); // string

logType(3n); //bigint
logType(true); //boolean
logType(false); //boolean
logType([]); //array
logType({}); //object
logType(null); //null
var test;
logType(test); //undefined

// typeof variable returns:  number string bigint boolean object function undefined symbol||{]\}

/*
X"undefined!"
X"null!"
X"number!"
X"not a number!"
X"string!"
X"boolean!"
X"bigint!"
X"function!"
X"object!"
X"array!"
"I have no idea!"*/
