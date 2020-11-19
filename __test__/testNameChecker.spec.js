import { checkForName } from "../src/client/js/nameChecker"

const fetch = require('node-fetch')
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing if the namechecker works", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Giving a correct URL",  () => {
        expect(checkForName('https://www.google.de')).toBeTruthy
    })
    test("Giving an incorrect start to the URL",  () => {
        expect(checkForName('ttps://www.google.de')).toBeFalsy
    })
    test("Forgetting the http/https",  () => {
        expect(checkForName('www.google.de')).toBeFalsy
    })
    test("Having white-spaces in the URl",  () => {
        expect(checkForName('https://www.goo gle.de')).toBeFalsy
    })

});
       