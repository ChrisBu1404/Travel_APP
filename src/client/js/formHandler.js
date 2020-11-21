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
    
    

    // let date1 = new Date(Number(yyyy),Number(mm),Number(dd));
    // let date2 = new Date(sDy,sDm,sDd);

    // let diff = interval(date1,date2);
    

    //let checkResponse = Client.checkForName(formText)
    console.log(formText)
    
    let serverData = await postData('http://localhost:8082/geoAPI', formText, startDate)
    serverData = await serverData.json()
    console.log('SerData: '+ serverData + ' Temp: ' + serverData.Condition)
}

function updateUI(res){
  if (true){
    console.log("The status of the API response is fine!")
    document.getElementById('results').innerHTML = 'The requested site is: ' + res.Country + ' and will be in: ' + diff.years + ' year(s), ' + diff.months + ' month(s) and ' + diff.days + 'day(s).'
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
      //'Content-Type': 'text/plain',
    },
    //body: 'test'
    body: JSON.stringify(data)
})
    // try {const newData = await response.json();
    //   console.log('postData: ' + newData.Country);
      // return newData;
    // }catch(error) {
    // console.log("error", error);
    // }
    return response;
}

// export async function postDataJson( url = '', data){
//   let response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8' ,
//   },
//   body: JSON.stringify(data),
//   })
//   try {const newData = await response.json();
//     console.log(newData);
//     return newData;
//   }catch(error) {
//   console.log("error", error);
//   }
// }
