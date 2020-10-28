const overview = require("./createOverview.js");

const express = require("express");
const app = express();

app.listen(8080, () => console.log("Listening..."));

app.use(require("cookie-parser")());

// gives you req.body
app.use(express.urlencoded({ extended: false }));

app.use((request, response, next) => {
    if (
        request.cookies.acceptCookies === "true" ||
        request.url === "/cookies" ||
        request.url === "/favicon.ico"
    ) {
        next();
    } else {
        response.cookie("originalRoute", request.url);
        response.redirect("/cookies");
    }
});

app.get("/cookies", (request, response) => {
    response.send(`
    <h1>You must accept cookies to view this website</h1>
        <form method='POST'>
            <input type='checkbox' name='acceptCookies'>
            <label for="acceptCookies">I accept all of the cookies!</label>
            <button>submit</button>
        </form>
    `);
});

app.post("/cookies", (request, response) => {
    if (request.body.acceptCookies === "on") {
        response.cookie("acceptCookies", "true");
        response.redirect(request.cookies.originalRoute);
    } else {
        response.send(
            `<h1>Well, sorry. You can't continue without accepting cookies.</h1>`
        );
    }
});

app.get("/", (request, response) => response.send(overview.create()));
app.use(express.static("projects"));
