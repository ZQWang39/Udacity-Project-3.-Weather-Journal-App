
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = `&appid=XXXXXXXXXXXXXXXXXXXXXXXXXX&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


//function called by event listener 

document.getElementById('generate').addEventListener('click',performAction);


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
    getWeather(baseURL, newZip, countryCode, apiKey)
    .then(function(data){
        console.log(data);
        postData('/add', {date:d, city: data.name, temp:data.main.temp,feels_like:data.main.feels_like, content:feelings})
        updateUI();
    })

};

//GET web API data

const getWeather = async (baseURL, zip, countryCode, key) =>{
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

//Updating UI elements

const updateUI = async()=>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('city').innerHTML = `City: ${allData.city}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('feels-like').innerHTML = `Feels like: ${allData.feels_like}`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.content}`;
       
    }catch(error){
        console.log('error',error);
    }
}


