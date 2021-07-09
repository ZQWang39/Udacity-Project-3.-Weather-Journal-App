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