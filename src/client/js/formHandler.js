import { interval } from './getDateDiff'
const fetch = require('node-fetch')

let today = new Date();
   const dd = String(today.getDate()).padStart(2, '0');
   const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   const yyyy = today.getFullYear();

   today = yyyy + '-' + mm + '-' + dd;

    

document.getElementById('start').value = today;
document.getElementById('start').min = today;



export async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let startDate = document.getElementById('start').value

    //let checkResponse = Client.checkForName(formText)
    console.log(formText)

    let serverData = await postData('http://localhost:8082/geoAPI', formText, startDate)
    serverData = await serverData.json()
    updateUI(serverData,formText)
}

function updateUI(res,formText){
  if (res){
    console.log("The status of the API response is fine!")
    if (res.daysUntil === 0){
    document.getElementById('results').innerHTML = 'Your trip to ' + formText + ', ' + res.geoData.country 
    + ' starts today. Get ready!'
    } else {
      document.getElementById('results').innerHTML = 'Your trip to ' + formText + ', ' + res.geoData.country 
    + ' starts in: ' + res.daysUntil + ' day(s).'
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

//Function to Post the input data to the server, to call the API and receive the API data
export async function postData( url = '', formText, travelDate){
  const data = {
    'city' : formText,
    'date' : travelDate
  }
  console.log(data)
  let response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json',

    },
    //body: 'test'
    body: JSON.stringify(data)
})

    return response;
}