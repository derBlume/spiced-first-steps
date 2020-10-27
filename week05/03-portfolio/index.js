const http = require("http");
const path = require("path");
const fs = require("fs");

const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

http.createServer((request, response) => {
    request.on("error", (error) => console.log("err in req: ", error));
    response.on("error", (error) => console.log("err in res: ", error));

    console.log("--------------------------------------------");

    //Make sure methods that aren't GET are ignored.
    if (request.method !== "GET") {
        response.statusCode = 405; // method not allowed
        return response.end();
    }

    //Create the path that leads to the directory/file we want to server.
    let filePath = path.normalize(__dirname + "/projects" + request.url);
    console.log("filePath: ", filePath);

    //This prevents a traversal attack.
    if (!filePath.startsWith(`${__dirname}/projects/`)) {
        response.statusCode = 403; // forbidden
        return response.end();
    }

    /*
        we use fs.stat to see if the thing being requested is a directory or a file.
        - if it's a directory, serve it's index.html file 
        - if it's a file, serve the file and set the appropriate content-type header
        - if the thing being requested does not exist in projects, send back a 404
    */
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.log("err in fs.stat: ", err);
            response.statusCode = 404; // page does not exist
            return response.end();
        }
        if (stats.isDirectory()) {
            if (request.url.endsWith("/")) {
                filePath += "/index.html";
            } else {
                response.setHeader("Location", request.url + "/");
                response.statusCode = 302;
                return response.end();
            }
        }
        const readStreamFile = fs.createReadStream(filePath);
        response.setHeader(
            "content-type",
            contentTypes[path.extname(filePath)]
        );
        readStreamFile.pipe(response);

        readStreamFile.on("error", (err) => {
            console.log("err in readStreamFile: ", err);
            response.statusCode = 500; // 500 means server error
            return response.end();
        });
    });
}).listen(8080, () => console.log("Listening!"));
