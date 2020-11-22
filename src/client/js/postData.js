//Function to Post the input data to the server, to call the API and receive the API data
const fetch = require('node-fetch')
export async function postData( url = '', formText, travelDate){
    const data = {
      'city' : formText,
      'date' : travelDate
    }
  
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