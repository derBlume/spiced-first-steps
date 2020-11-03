const { getToken, getTweets, filterTweets } = require("./twitter");
const express = require("express"); // 3rd party module

const TWITTER_USER = "derspiegel";

const app = express();

app.use(express.static("ticker"));

app.get("/headlines.json", (request, response) => {
    getToken()
        .then((bearerToken) => {
            return getTweets(bearerToken, TWITTER_USER);
        })
        .then((rawTweets) => {
            const filteredTweets = filterTweets(rawTweets);
            response.json(filteredTweets);
        });
});

app.listen(8080);
