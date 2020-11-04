const express = require("express");

const { getToken, getTweets, filterTweets } = require("./twitter");

const app = express();

app.listen(8080);

app.use(express.static("ticker"));

const TWITTER_ACCOUNTS = ["derspiegel", "nytimes", "zeitonline"];

app.get("/headlines.json", (request, response) => {
    getToken()
        .then((bearerToken) => {
            return Promise.all(
                TWITTER_ACCOUNTS.map((twitterAccount) =>
                    getTweets(bearerToken, twitterAccount)
                )
            );
        })
        .then((tweets) => {
            tweets = tweets.flat().sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            for (let tweet of tweets) {
                tweet.full_text =
                    "@" +
                    tweet.user.screen_name.toUpperCase() +
                    ": " +
                    tweet.full_text;
            }
            response.json(filterTweets(tweets));
        })
        .catch((error) => {
            response.sendStatus(500);
            console.log("SOMETHING WENT WRONG: ", error);
        });
});
