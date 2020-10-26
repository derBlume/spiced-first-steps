const http = require("http");
const chalk = require("chalk");
const fs = require("fs");

const server = http.createServer();

server.listen(8080, () => console.log("listening..."));

server.on("request", (request, response) => {
    request.on("error", (err) => {
        console.log("err in request: ", err);
    });
    response.on("error", (err) => {
        console.log("err in response: ", err);
    });

    console.log(chalk.red("-----NEW REQUEST-------"));
    console.log("request.url: ", request.url);
    console.log("request.method: ", request.method);
    console.log("request.headers: ", request.headers);

    if (request.method === "GET") {
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        response.write(
            `<!doctype html><html><title>Hello World!</title><p>Hello World!</p></html>`
        );
        response.end();
    } else if (request.method === "HEAD") {
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        response.end();
    } else if (request.method === "POST") {
        let body = "";
        request
            .on("data", (chunk) => {
                body += chunk;
            })
            .on("end", () => {
                console.log(body);
            });

        response.setHeader("Location", "/");
        response.statusCode = 302;
        response.end();
    } else {
        response.statusCode = 405;
        response.end();
    }
    let now = new Date();

    fs.appendFile(
        "requests.txt",
        `${now.toDateString()} \t ${now.toTimeString()} \t ${
            request.method
        } \t ${request.url} \t ${request.headers["user-agent"]}
        `,
        (err) => {
            if (err) console.log("Error writing file: ", err);
        }
    );
});
