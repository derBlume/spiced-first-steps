const { find } = require("./countries");

test("When find is passed an empty string, it returns an empty array", () => {
    expect(find("")).toEqual([]);
});

test("The array that it returns contains no more than four matches", () => {
    expect(find("U")).toHaveLength(4);
});

test("The search is case insensitive", () => {
    expect(find("U")).toEqual(find("u"));
});

test("If there are no matching countries, an empty array is returned", () => {
    expect(find("thisCountryDoesNotExist")).toEqual([]);
});
