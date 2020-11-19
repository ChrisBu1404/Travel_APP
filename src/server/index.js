const dotenv = require('dotenv');
dotenv.config();
//API imports
const API_KEY = process.env.API_KEY;
const userNameGeoNames = process.env.user_name_geoNames;
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const app = express()
let geoData = {}
//Variables
let url = ''
let apiData = {}
const geoNamesURL= 'http://api.geonames.org/searchJSON?name_equals='

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
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.post('/input', getGeoApiData);



async function getGeoApiData(req,res) {
    console.log(req.body + ' has been requested.')
    const response = await fetch(geoNamesURL + req.body + "&featureClass=P" + "&username=" + userNameGeoNames)
          try {
            let data = await response.json();
            let apiData = {
                'Longitude': data.geonames[0].lng,
                'Lattidue': data.geonames[0].lat,
                'Country': data.geonames[0].countryName
            }
            geoData = apiData;
            res.send(apiData);
          } catch(error) {
                console.log("error", error);
                res.send('Could not get API info.')
        }
      };
