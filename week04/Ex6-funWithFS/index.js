const fs = require("fs");

const path = __dirname;

function logSizes(path) {
    fs.readdir(path, { withFileTypes: true }, function (err, files) {
        if (err) {
            console.log("Reading directory didn't work.", err);
        } else {
            files.forEach((element) => {
                if (element.isFile()) {
                    fs.stat(path + "/" + element.name, (err, stats) => {
                        if (err) {
                            console.log(("Getting stats didn't work.", err));
                        } else {
                            console.log(
                                path + "/" + element.name + ": " + stats.size
                            );
                        }
                    });
                } else if (element.isDirectory()) {
                    logSizes(path + "/" + element.name);
                }
            });
        }
    });
}

//logSizes(path + "/files");

function mapSizes(path) {
    let results = {};
    let files;
    try {
        files = fs.readdirSync(path, { withFileTypes: true });
    } catch (err) {
        console.log("Reading directory didn't work", err);
    }

    files.forEach((element) => {
        if (element.isFile()) {
            let stats;
            try {
                stats = fs.statSync(path + "/" + element.name);
            } catch (err) {
                console.log(("Getting stats didn't work.", err));
            }

            results[element.name] = stats.size;
        } else if (element.isDirectory()) {
            results[element.name] = mapSizes(path + "/" + element.name);
        }
    });
    return results;
}

let mapObj = mapSizes(path + "/files");

fs.writeFileSync(path + "/files.json", JSON.stringify(mapObj, null, 4));

function mapSizesAsync(path, cb, counter) {
    let results = {};
    let cbCounter = counter;
    cbCounter++;
    console.log("outer increased", cbCounter);
    fs.readdir(path, { withFileTypes: true }, function (err, files) {
        if (err) {
            console.log("Reading directory didn't work.", err);
            return;
        } else {
            files.forEach((element) => {
                if (element.isFile()) {
                    cbCounter++;
                    console.log("inner increased", cbCounter);
                    fs.stat(path + "/" + element.name, (err, stats) => {
                        if (err) {
                            console.log(("Getting stats didn't work.", err));
                            return;
                        } else {
                            results[element.name] = stats.size;
                            //console.log(results);
                        }
                        cbCounter--;
                        console.log("inner decreased", cbCounter);
                    });
                } else if (element.isDirectory()) {
                    mapSizesAsync(path + "/" + element.name, cb, cbCounter);
                }
            });
        }
        cbCounter--;
        console.log("outer decreased", cbCounter);
    });
    if (cbCounter === 0) {
        cb(results);
    }
}

function actuallyWriteFile(results) {
    console.log("callback called");
    fs.writeFile(
        path + "/filesAsync.json",
        JSON.stringify(results, null, 4),
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
}

mapSizesAsync(path + "/files", actuallyWriteFile, 0);
//let mapObjAsync = mapSizesAsync(path + "/files");
//console.log(JSON.stringify(mapSizesAsync(path + "/files"), null, 4));
