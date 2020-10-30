const projects = require("./projects.json");

const express = require("express");
const app = express();

const hb = require("express-handlebars");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.listen(8080, () => console.log("Listening..."));

app.use(express.static("projects"));
app.use(express.static("public"));

app.get("/", (request, response) => {
    response.render("home", { projects });
});

app.get("/description/:projectName", (request, response) => {
    for (let project of projects) {
        if (project.dir === request.params.projectName) {
            response.render("description", { project, projects });
        }
    }
});
