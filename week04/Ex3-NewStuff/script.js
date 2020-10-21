const arrayOne = [1, 2, 3, 4, 5];

const returnReversedCopy = (array) => {
    return [...array].reverse();
};

const arrayTwo = returnReversedCopy(arrayOne);
console.log("arrayOne:", arrayOne);
console.log("arrayTwo:", arrayTwo);
console.log("---------END OF EXERCISE 1---------");

const chainTwoArrays = (arr1, arr2) => {
    return [...arr1, ...arr2];
};

const arraysOneAndTwo = chainTwoArrays(arrayOne, arrayTwo);
console.log("arrayOne:", arrayOne);
console.log("arrayTwo:", arrayTwo);

console.log("arraysOneAndTwo:", arraysOneAndTwo);
console.log("---------END OF EXERCISE 2---------");

function logInfo(city) {
    const { name, country, population: numPeople } = city;

    console.log(`${name} is in ${country} and has ${numPeople} in it.`);
}

var FRA = { name: "Frankfurt", country: "Germany", population: 500000 };
logInfo(FRA);
console.log("---------END OF EXERCISE 3---------");

var STH = {
    name: "Stockholm",
    country: "Sweden",
    population: 1000000,
};

let getNameAndCountry = ({ name, country }) => [name, country];

function getNameAndCountryRetro(cityObj) {
    return [cityObj.name, cityObj.country];
}

let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
    let [, country] = getNameAndCountry(city2);
    return {
        ...city1,
        country,
    };
};

function getRelocatedCityRetro(city1, city2) {
    if (city2 === undefined) {
        city2 = { country: "Germany" };
    }
    var country = getNameAndCountryRetro(city2)[1];

    city1.country = country;
    return city1;
}

console.log("Hipster Code:");
console.log(getRelocatedCity(FRA, STH));
console.log(getRelocatedCity(STH));

console.log("Retro Code:");
console.log(getRelocatedCityRetro(FRA, STH));
console.log(getRelocatedCityRetro(STH));
