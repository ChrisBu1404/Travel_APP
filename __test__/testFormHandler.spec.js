import { postData } from "../src/client/js/postData"
const fetch = require('node-fetch')
jest.mock('node-fetch')



// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing if the API can be called and the correct value is returned", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    fetch.mockResolvedValue({
        geoData : 'test',
        weather : 'test1',
        picture : 'test2',
        daysUntil : 'test3'
    })
    test("Testing the postData function with mockdata", async (done) => {
        const serverData = await postData('http://localhost:8082/geoAPI','Braunschweig','2020-12-01')
        expect(serverData).toEqual(
            {
                geoData : 'test',
                weather : 'test1',
                picture : 'test2',
                daysUntil : 'test3'
            }
        )
        done()
    })});
