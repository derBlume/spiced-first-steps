const http = require("http");
const querystring = require("querystring");
const chalk = require("chalk");

http.createServer((request, response) => {
    request.on("error", (err) => {
        console.log(err);
    });

    response.on("error", (err) => {
        console.log(err);
    });

    if (request.method === "GET") {
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        // response.write allows us to define what the "body" of the response
        // should look like
        response.write(`<!doctype html>
            <html>
            <title>Colors</title>
            <form method="POST">
            <input type="text" name="text">
            <select name="color">
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="gray">gray</option>
                <option value="magenta">magenta</option>
                <option value="cyan">cyan</option>
            </select>
            <button type="submit">Go</button>
            </form>
            </html>`);
        response.end();
    } else if (request.method === "POST") {
        let body = "";

        request.on("data", (chunk) => {
            body += chunk;
        });

        request.on("end", () => {
            let myData = querystring.parse(body);
            console.log(chalk[myData.color](myData.text));
            response.write(
                `<!doctype html>
                <html>
                    <title>${myData.text}</title>
                    <a href="/" style="color:${myData.color}">${myData.text}</a>
                </html>`
            );
            response.end();
        });
    }
}).listen(8080, () => console.log("Listening!"));
