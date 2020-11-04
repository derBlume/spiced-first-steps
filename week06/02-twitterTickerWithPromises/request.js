/* This is a generic module to make requests to APIs. It makes TWO ASSUMPTIONS:
1. The API works with https
2. THE API response body is JSON */

const https = require("https");

module.exports.request = (options, body) => {
    return new Promise((resolve, reject) => {
        function handleResponse(response) {
            if (response.statusCode !== 200) {
                reject(new Error(response.statusCode));
            } else {
                let body = "";
                response
                    .on("data", (chunk) => {
                        body += chunk;
                    })
                    .on("end", () => {
                        resolve(JSON.parse(body));
                    });
            }
        }

        https.request(options, handleResponse).end(body);
    });
};
