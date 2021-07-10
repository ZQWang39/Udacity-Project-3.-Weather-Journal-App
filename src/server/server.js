// Setup empty JS object to act as endpoint for all routes
//projectData = [];
projectData = {};
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

//To encrypt API key
const dotenv = require('dotenv');
dotenv.config();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', (req,res)=>{
 res.sendFile("dist/index.html");
})

//API data

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = `&appid=353de7bcd1a9dcbed3b1e9290d08485a&units=metric`;

app.post('/weather', async function (req, res){
    //user input
    console.log(req.body)
    const zip = req.body.zip;
    const content = req.body.content;
    const code = req.body.countryCode;
    const urlApi = `${baseURL}${zip},${code}${apiKey}`
    const response = await fetch(urlApi);
    try {
     const APIData = await response.json();
     console.log('server side data', APIData);
     res.send(APIData);
     return APIData
     
 }
 catch (error) {
     console.log("error", error);
 }
    
 });

//GET route
/*
app.get('/all',(req,res)=>{
    res.send(projectData);
    console.log(projectData);

});


//POST route
app.post('/add',(req,res)=>{
    let data = req.body;
    console.log('server side data', data);
    newEntry = {
        date: req.body.date,
        city:req.body.city,
        temp:req.body.temp,
        feels_like:req.body.feels_like,
        content:req.body.content,
        
    }
    //projectData.push(newEntry);
    projectData = newEntry;
    console.log(projectData);
})
// Setup Server
*/

const port = 8080;
const server = app.listen(port, listening);
function listening(){
    console.log(`Server is running on localhost:${port}`);
    
}