const fs = require("fs");
const path = __dirname + "/projects/";

function createOverview() {
    let results = `<!doctype html><html><title>Project Overview</title><h1>Choose project:</h1>`;
    let files;
    try {
        files = fs.readdirSync(path, { withFileTypes: true });
    } catch (err) {
        console.log("Reading directory didn't work", err);
    }

    files.forEach((element) => {
        if (element.isDirectory()) {
            results += `<p><a href="/${element.name}/">${element.name}</a></p>`;
        }
    });

    results += `</html>`;
    return results;
}

module.exports.create = createOverview;
