const dotenv = require('dotenv');
dotenv.config();
//API imports
const API_KEY_Weatherbit = process.env.API_KEY_Weatherbit;
const userNameGeoNames = process.env.user_name_geoNames;
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const app = express()

//Variables
let geoData = {}
let apiData = {}
let weatherData ={}
const geoNamesURL = 'http://api.geonames.org/searchJSON?name_equals='
const weatherBitCurrentURL = 'https://api.weatherbit.io/v2.0/current?'
const weatherBitHistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?'

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

app.post('/geoAPI', getGeoApiData);
app.post('/weatherAPI', getWeatherApiData);


async function getGeoApiData(req,res) {
    console.log(req.body + ' has been requested.')
    const response = await fetch(geoNamesURL + req.body + "&featureClass=P" + "&username=" + userNameGeoNames)
          try {
            let data = await response.json();
            //console.log('Hallo')
            let apiData = {
                'Longitude': data.geonames[0].lng,
                'Lattitude': data.geonames[0].lat,
                'Country': data.geonames[0].countryName
            }
            geoData = apiData;
            //console.log('Geodata: '+ geoData + ' GeoAPIdata: ' + apiData)
            res.send(apiData);
          } catch(error) {
                console.log("error", error);
                res.send('Could not get API info.')
        }
      };

async function getWeatherApiData(req,res) {
    console.log(req.body + ' Weather has been requested.')
    console.log(req.body.lat + ' : ' + req.body.lon)
    const response = await fetch(weatherBitCurrentURL + 'lat=' + req.body.lat + "&lon=" + req.body.lon + "&key=" + API_KEY_Weatherbit)
        try {
            console.log('Weather Data 1: ' + response)
            let data = await response.json();
            console.log('Weather Data 2: ' + data)
            let apiData = {
                //'Condition': data[0].weather.description,
                'Temperature': data[1].temp,
            }
            weatherData = apiData;
            console.log('Weather Data 3: ' +weatherData)
            res.send(apiData);
        } catch(error) {
            console.log("error", error);
            res.send('Could not get WeatherAPI info.')
        }
};

