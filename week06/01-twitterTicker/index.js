const twitter = require("./twitter");
const express = require("express"); // 3rd party module

const TWITTER_USER = "derspiegel";

const app = express();

app.use(express.static("ticker"));

app.get("/headlines.json", (request, response) => {
    // 4 things we need to do:
    // 1. Need to get the token. As soon as we have our token...
    // 2. use the token to make a request to fetch out tweets...
    // 3. filter / formatting the tweets
    // 4. send back the filtered tweets as json

    twitter.getToken(function (error, bearerToken) {
        //console.log(error, bearerToken);

        if (error) {
            response.sendStatus(500);
        } else {
            twitter.getTweets(bearerToken, TWITTER_USER, function (
                error,
                rawTweets
            ) {
                if (error) {
                    response.sendStatus(500);
                } else {
                    const filteredTweets = twitter.filterTweets(rawTweets);

                    response.json(filteredTweets); // stringifies JSON & set appropriate content type headers
                }
            });
        }
    });
});

app.listen(8080);
