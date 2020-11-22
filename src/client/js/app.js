import { interval } from './getDateDiff'
const fetch = require('node-fetch')
const moment = require('moment')

const today = moment().format('YYYY-MM-DD')
const tomorrow = moment().add(1,'days').format('YYYY-MM-DD')


document.getElementById('start').value = today;
document.getElementById('start').min = today;
document.getElementById('end').value = tomorrow;
document.getElementById('end').min = tomorrow;



export async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let startDate = document.getElementById('start').value
    let endDate = document.getElementById('end').value

    const tripDuration = interval(startDate,endDate)

    //let checkResponse = Client.checkForName(formText)
    

    let serverData = await postData('http://localhost:8082/geoAPI', formText, startDate)
    serverData = await serverData.json()
    if (formText === ""){
      alert('Please enter a destination')
    } else {
      updateUI(serverData,formText,tripDuration)
    }
}

function updateUI(res,formText,tripDuration){
  if (res){
    console.log("The status of the API response is fine!")
    document.getElementById('searchResults').innerHTML ="<strong>Search results:</strong>"
    if (res.daysUntil === 0){
    document.getElementById('results').innerHTML = 'Your trip to ' + formText + ', ' + res.geoData.country 
    + ' starts soon and will be for ' + tripDuration + ' day(s). Get ready!'
    } else {
      document.getElementById('results').innerHTML = 'Your trip to ' + formText + ', ' + res.geoData.country 
    + ' starts in: ' + res.daysUntil + ' day(s) and will be for ' + tripDuration + ' day(s).'
    }
    document.getElementById('pic').innerHTML = "<img src="+ res.picture + " width=\"300px\" alt=\"City Picture\">  </img>"
    if (res.daysUntil <=7){
      document.getElementById('weather').innerHTML = "The current weather is " + res.weather.Condition.toLowerCase() + " with a temperature of " + res.weather.Temperature + "&#8451."
    } else {
      document.getElementById('weather').innerHTML = "The weather at the time of the trip is typically " + res.weather.Condition.toLowerCase() + " with a temperature of " + res.weather.Temperature + "&#8451."
    }
  }else{
  document.getElementById('results').innerHTML = 'The API request was faulty!'
  }
}

