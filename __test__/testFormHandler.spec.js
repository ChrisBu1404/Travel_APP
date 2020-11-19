import { postData } from "../src/client/js/formHandler"

const fetch = require('node-fetch')
jest.mock('node-fetch')

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing if the API can be called and the correct value is returned", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    fetch.mockResolvedValue({
        'title': 'test json response',
        'message': 'this is a message',
        'time': 'now'
    })
    test("Testing the postData function with mockdata", async () => {
        const data = await postData('http://localhost:8081/test',"https://www.google.com")
        expect(data).toEqual(
            {
                'title': 'test json response',
                'message': 'this is a message',
                'time': 'now'
            }
        )
    })});
