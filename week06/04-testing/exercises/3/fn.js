module.exports = function fn(input) {
    if (typeof input === "string") {
        return input.split("").reverse().join("");
    } else if (Array.isArray(input)) {
        let output = [];
        for (let element of input) {
            output.push(fn(element));
        }
        return output;
    } else return null;
};
