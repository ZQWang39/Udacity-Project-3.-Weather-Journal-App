
/* Global Variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = `&appid=353de7bcd1a9dcbed3b1e9290d08485a&units=metric`;
 */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


export function performAction(e){
    e.preventDefault();
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const countryCode = document.getElementById('countryCode').value;

    if(countryCode ==''){
        alert('Please enter the country calling code!')
    };
    if(newZip ==''){
        alert('Please enter your zipcode!')
    };
    if(feelings ==''){
        confirm('Are you sure do not want to say anything?')
    }
    postWeatherData("http://localhost:8801/weather", {date:d, city: data.name, temp:data.main.temp,feels_like:data.main.feels_like, content:feelings})
    .then(function(data){
        console.log(data);
        updateUI(data);
    });

    /*
    getWeather(baseURL, newZip, countryCode, apiKey)
    .then(function(data){
        console.log(data);
        postData('http://localhost:8081/weather', {date:d, city: data.name, temp:data.main.temp,feels_like:data.main.feels_like, content:feelings})
        updateUI();
    })
    */

};

 //POST WeatherBit API data
 const postWeatherData = async (url = "", data = {}) =>{
        
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });//end of response
    try {
        const newData = await response.json();
               return newData
      }catch(error) {
      console.log("error", error);
  
      }
  
}

//GET web API data

/*const getWeather = async (baseURL, zip, countryCode, key) =>{
     const res = await fetch(baseURL+zip+','+countryCode+key);
     try{
         const data = await res.json();
         console.log(data);
         return data;
     }catch(error){
         console.log("error", error);
     }
}

//POST data

const postData = async ( url = '', data = {})=>{
     console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),      
  });

    try {
      const newData = await response.json();
             return newData
    }catch(error) {
    console.log("error", error);

    }
}
*/
//Updating UI elements
function updateUI(data){
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('city').innerHTML = `City: ${data.city}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
        document.getElementById('feels-like').innerHTML = `Feels like: ${data.feels_like}`;
        document.getElementById('content').innerHTML = `Feelings: ${data.content}`;
}


