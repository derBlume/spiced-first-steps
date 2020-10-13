(function (countries) {
    var MAX_NUMBER_OF_RESULTS = 4;

    var inputField = $("input[name=country]");
    var resultsContainer = $(".results");
    var highlighted;

    inputField.on("input", function () {
        var input = inputField.val();
        var results = [];

        resultsContainer.empty();

        if (input != "") {
            for (var country of countries) {
                if (country.toLowerCase().indexOf(input.toLowerCase()) === 0) {
                    results.push(country);
                }

                if (results.length === MAX_NUMBER_OF_RESULTS) {
                    break;
                }
            }
            if (results.length === 0) {
                results.push("<span class='errormessage'>no results</span>");
            }
        }

        for (var result of results) {
            resultsContainer.append("<p>" + result + "</p>");
        }
    });

    $(resultsContainer).on("click", "p", function (e) {
        inputField.val($(e.target).text());
        resultsContainer.empty();
    });

    $(resultsContainer).on("mouseover", "p", function (e) {
        $(resultsContainer).children().removeClass("highlighted");
        $(e.target).addClass("highlighted");
        highlighted = $(e.target).text();
    });

    $(inputField).on("blur", function () {
        resultsContainer.hide();
    });

    $(inputField).on("focus", function () {
        resultsContainer.show();
    });

    $(inputField).on("keydown", function (event) {
        var idx = $("p.highlighted").index();
        highlighted = resultsContainer.children().eq(idx).text();

        if (event.key === "Enter") {
            inputField.val(highlighted);
            resultsContainer.empty();
        } else if (event.key === "ArrowDown") {
            resultsContainer.children().eq(idx).removeClass("highlighted");
            resultsContainer
                .children()
                .eq((idx + 1) % MAX_NUMBER_OF_RESULTS)
                .addClass("highlighted");
        } else if (event.key === "ArrowUp") {
            resultsContainer.children().eq(idx).removeClass("highlighted");
            resultsContainer
                .children()
                .eq((idx - 1) % MAX_NUMBER_OF_RESULTS)
                .addClass("highlighted");
        }
    });
})([
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
]);
