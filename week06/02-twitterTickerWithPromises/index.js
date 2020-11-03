const { getToken, getTweets, filterTweets } = require("./twitter");
const express = require("express"); // 3rd party module

//const TWITTER_USER = "derspiegel";

const app = express();

app.use(express.static("ticker"));

app.get("/headlines.json", (request, response) => {
    getToken()
        .then((bearerToken) => {
            return Promise.all([
                getTweets(bearerToken, "derspiegel"),
                getTweets(bearerToken, "nytimes"),
                getTweets(bearerToken, "zeitonline"),
            ]);
        })
        .then((rawTweets) => {
            rawTweets = rawTweets.flat().sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            for (let tweet of rawTweets) {
                tweet.full_text =
                    tweet.user.name.toUpperCase() + ": " + tweet.full_text;
            }
            const filteredTweets = filterTweets(rawTweets);

            response.json(filteredTweets);
        })
        .catch((error) => {
            response.sendStatus(500);
            console.log("SOMETHING WENT WRONG: ", error);
        });
});

app.listen(8080);
