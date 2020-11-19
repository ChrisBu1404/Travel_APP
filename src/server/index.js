const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const app = express()

//Variables
let url = ''
let apiData = {}
const baseURL= 'https://api.meaningcloud.com/sentiment-2.1?key='

app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.text())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/input', getApiData);

async function getApiData(req,res) {
    console.log(req.body + ' has been requested.')
    const response = await fetch(baseURL + API_KEY + '&of=json&lang=en&url=' + req.body)
          try {
            let data = await response.json();
            apiData = data;
            res.send(apiData);
          } catch(error) {
                console.log("error", error);
                res.send('Could not get API info.')
        }
      };
