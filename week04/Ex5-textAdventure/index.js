// first step in new folder: npm init
// npm install chalk

const readline = require("readline"); // core module

const chalk = require("chalk"); // 3rd party module

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const great =
    "Great! Make sure, everybody adheres to distancing and hygiene rules, though.";
const conversation = {
    q: "Is it your birthday soon?",
    answers: {
        no: "Sorry, then this is not for you.",
        yes: {
            q: "Do you want to have a party to celebrate?",
            answers: {
                no:
                    "Oh, really? That's unexpected. But it's your birthday, so... OK. No Party.",
                yes: {
                    q: "Is there a pandemia of some sort going on?",
                    answers: {
                        no:
                            "Lucky you! Then just go ahead and partypartyparty as you like!",
                        yes: {
                            q:
                                "That's unfortunate. But wait, maybe you still can celebrate somehow. What's the weatherforecast for your birthday?",
                            answers: {
                                dry: {
                                    q:
                                        "Great! Just have a party outdoors. According to pandemia laws and regulations a maximum of 10 people can gather. How many do you plan to invite?",
                                    answers: {
                                        1: great,
                                        2: great,
                                        3: great,
                                        4: great,
                                        5: great,
                                        6: great,
                                        7: great,
                                        8: great,
                                        9: great,
                                    },
                                },
                                rainy: {
                                    q:
                                        "Shit. Your party will need to be indoors. But that means there's a pretty high risk that you and your guests transmit the pandemic desease among each other. Are you sure, you still want to have a party?",
                                    answers: {
                                        yes:
                                            "That's probably not a good idea. If you do it anyways, make sure, people wear masks whenever possible, the room is big enough for everybody to have 2 Meters free space around them and open the window regularly to lüften.",
                                        no:
                                            "I know, it's tough. But you'll have another birthday next year. And then another one, the year after. And then another one....",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

function askQuestion(question) {
    // TODO: also print to user the possible / valid answers
    let possibleAnswers = "| ";
    for (let i in question.answers) {
        possibleAnswers = possibleAnswers + i + " | ";
    }

    rl.question(
        chalk.magenta(question.q + " ") + chalk.green(possibleAnswers),
        (answer) => {
            const valid = answer in question.answers;

            if (!valid) {
                console.log("That's not an option, sorry!");
                askQuestion(question);
            } else if (typeof question.answers[answer] === "string") {
                console.log(question.answers[answer]);
                rl.close();
            } else if (typeof question.answers[answer] === "object") {
                askQuestion(question.answers[answer]);
            }
        }
    );
}

askQuestion(conversation);
