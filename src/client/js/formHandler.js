const fetch = require('node-fetch')
export async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    let checkResponse = Client.checkForName(formText)
    //Call function to post the API request and get the data from the server
    let serverData = postData('http://localhost:8081/input', formText)
        .then(serverData => serverData.json())
        .then(function (res) {
            updateUI(res)
        })
    //Function to return the API results to the UI
    function updateUI(res){
        if (res.status.code === '0' ){
            console.log("The status of the API response is fine!")
            document.getElementById('results').innerHTML = 'The requested site is: ' + res.subjectivity
        }else{
        document.getElementById('results').innerHTML = 'The API request was faulty!'
        }
    }
}

  //Function to Post the input data to the server, to call the API and receive the API data
export async function postData( url = '', formText){
    let response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: formText, 
    })
    return response
}

