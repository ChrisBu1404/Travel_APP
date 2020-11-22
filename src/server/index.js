const dotenv = require('dotenv');
dotenv.config();
//API imports
const API_KEY_Weatherbit = process.env.API_KEY_Weatherbit;
const userNameGeoNames = process.env.user_name_geoNames;
const API_KEY_Pixabay = process.env.API_KEY_Pixabay;
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const app = express()
const moment = require('moment')
//Variables
const geoNamesURL = 'http://api.geonames.org/searchJSON?name_equals='
const weatherBitCurrentURL = 'https://api.weatherbit.io/v2.0/current?'
const weatherBitHistoryURL = 'https://api.weatherbit.io/v2.0/history/hourly?'
const pixabayURL = 'https://pixabay.com/api/?key='

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
// app.use(function(req,res,next){
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
// })

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


app.post('/geoAPI', main);

app.listen(8082, function () {
    console.log('Travel app listening on port 8082!')
    app.emit("appStarted");
})


async function main(req,res) {
    const {city,date} = req.body
    const dateObj = getDates(date)
    try {
        const geoData = await getGeoData(city)
        const weather = await getWeather(geoData.lattitude,geoData.longitude,dateObj)
        const picture = await getPicture(city)

        const apiData = {
            geoData : geoData,
            weather : weather,
            picture : picture,
            daysUntil : dateObj.daysUntil
        }

        res.send(apiData)
    } catch(error) {
        console.log("error", error);
        res.send('Could not get API info.')
    }
};



function getDates(dateString) {
    const date = moment(dateString)
    const today = moment()
    const daysUntil = date.diff(today,'days')
    const dates = {
        travelDate : date,
        daysUntil : daysUntil
    }
    return dates
}

async function getWeather(lat,lon,dateObj){
    if (dateObj.daysUntil <= 7){
        const weatherDataresponse = await fetch(weatherBitCurrentURL + 'lat=' + lat + "&lon=" + lon + "&key=" + API_KEY_Weatherbit)
        const weatherData = await weatherDataresponse.json();
        const weather =
            {
            'Condition': weatherData.data[0].weather.description,
            'Temperature': weatherData.data[0].temp
        }
        return weather
    } else {
        const histDate = dateObj.travelDate.subtract(1,'years').format('YYYY-MM-DD:12')
        const histDateEnd = dateObj.travelDate.add(1,'days').format('YYYY-MM-DD:12')
        const weatherDataresponse = await fetch(weatherBitHistoryURL + 'lat=' + lat + "&lon=" + lon + "&start_date=" +
        histDate + '&end_date=' + histDateEnd +  "&key=" + API_KEY_Weatherbit)
        const weatherData = await weatherDataresponse.json();
        const weather =
            {
            'Condition': weatherData.data[0].weather.description,
            'Temperature': weatherData.data[0].temp
        }
        return weather
    }
}

async function getGeoData(city){
    const response = await fetch(geoNamesURL + city + "&featureClass=P" + "&username=" + userNameGeoNames)
    const data = await response.json();
    const geoData = {
        longitude : data.geonames[0].lng,
        lattitude : data.geonames[0].lat,
        country : data.geonames[0].countryName
    }
    return geoData;
}

async function getPicture(city){
    const response = await fetch(pixabayURL + API_KEY_Pixabay + '&q=' + city + '&image_type=photo')
    const data = await response.json();
    const picURL = data.hits[0].webformatURL;
    return picURL
}
module.exports = app