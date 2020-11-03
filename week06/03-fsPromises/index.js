const { readdir, stat } = require("fs").promises;

const path = __dirname;

function logSizes(path) {
    return readdir(path, { withFileTypes: true }).then((files) => {
        let arrayOfPromises = [];
        for (let element of files) {
            if (element.isFile()) {
                arrayOfPromises.push(
                    stat(path + "/" + element.name).then((stats) => {
                        console.log(
                            path + "/" + element.name + ": " + stats.size
                        );
                    })
                );
            } else {
                arrayOfPromises.push(logSizes(path + "/" + element.name));
            }
        }
        return Promise.all(arrayOfPromises);
    });
}

logSizes(path + "/files").then(() => {
    console.log("Done!");
});

/* function logSizes(path) {
    readdir(path, { withFileTypes: true }, function (err, files) {
        if (err) {
            console.log("Reading directory didn't work.", err);
        } else {
            files.forEach((element) => {
                if (element.isFile()) {
                    stat(path + "/" + element.name, (err, stats) => {
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
} */
