const { request } = require("./request");
const credentials = require("./credentials.json");

// encoded in base64
const encodedCredentials = Buffer.from(
    `${credentials.key}:${credentials.secret}`
).toString("base64");

module.exports.getToken = function getToken() {
    const options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        method: "POST",
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    };

    return request(options, "grant_type=client_credentials").then(
        (data) => data.access_token
    );
};

module.exports.getTweets = function getTweets(bearerToken, twitterUser) {
    const options = {
        host: "api.twitter.com",
        path: `/1.1/statuses/user_timeline.json?screen_name=${twitterUser}&tweet_mode=extended`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    };
    return request(options);
};

module.exports.filterTweets = function (rawTweets) {
    let filteredTweets = [];
    let i = 0;
    for (let tweet of rawTweets) {
        if (tweet.entities.urls.length === 1) {
            console.log("----------");

            let cleanText = tweet.full_text.replace(
                tweet.entities.urls[0].url,
                ""
            );
            if (tweet.entities.media) {
                //console.log(tweet.entities.media);
                for (let medium of tweet.entities.media) {
                    cleanText = cleanText.replace(medium.url, "");
                }
            }

            console.log(cleanText);
            filteredTweets[i] = {};
            filteredTweets[i].text = cleanText;
            filteredTweets[i].link = tweet.entities.urls[0].url;
            i++;
        }
    }

    return filteredTweets;
    // this function will filter (clean up) the response from the twitter api
    // you will also complete this on your own
};
