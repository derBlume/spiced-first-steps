Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function (script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

var data = {
    authors: [
        {
            name: "Kahlil Gibran",
            born: 1883,
            died: 1931,
            selectedWritings: [
                "The Prophet",
                "Sand and Foam",
                "The Earth Gods",
            ],
            quote:
                "We live only to discover beauty. All else is a form of waiting.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/3/34/Kahlil_Gibran_1913.jpg",
        },
        {
            name: "Oscar Wilde",
            born: 1854,
            died: 1900,
            selectedWritings: [
                "The Picture of Dorian Gray",
                "The Importance of Being Earnest",
                "De Profundis",
            ],
            quote:
                "The bureaucracy is expanding to meet the needs of the expanding bureaucracy.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/800px-Oscar_Wilde_Sarony.jpg",
        },
        {
            name: "Maya Angelou",
            born: 1928,
            died: 2014,
            selectedWritings: [
                "I Know Why the Caged Bird Sings",
                "Gather Together in My Name",
                "The Heart of a Woman",
            ],
            quote:
                "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
            photo:
                "https://upload.wikimedia.org/wikipedia/commons/b/b4/Angelou_at_Clinton_inauguration.jpg",
        },
    ],
};

var main = document.querySelector("main");

for (var author of data.authors) {
    main.insertAdjacentHTML(
        "beforeend",
        Handlebars.templates.authorsTemplate(author)
    );
}
