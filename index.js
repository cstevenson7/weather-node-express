//to get access to express you need a require statement
const express = require('express');
const fetch = require("node-fetch");

// we need this to create an  web application, we do that
// by using the express function. That whole  Express library
// basically comes in as a whole function
 const app = express();
 // this tells this server to load anything in the .env file
// as a  environment variable  - use .gitignore
require('dotenv').config();

 const ab_map = new Map(Object.entries({
    'Calgary':[51.05,-114.09],
    'Edmonton':[53.55,-113.49],
    'Banff':[51.18,-115.57],
    'Nordegg':[52.47,-116.08],
    'Jasper':[52.87,-118.08],
    'Drumheller':[51.46,-112.71],
    'Lethbridge':[49.70,-112.85],
    'Peace River':[56.23,-117.33],
    'Grande Prairie':[55.17,-118.79],
    'Athabasca':[54.72, 113.29],
    'Cold Lake':[54.45, 110.17]
}));

const bc_map = new Map(Object.entries({
    'Invermere':[50.51,-116.03],
    'Cranbrook':[49.51,-115.77],
    'Sparwood':[49.73,-114.88],
    'Kamlooops':[50.67,-120.33],
    'Kelowna':[49.89, -119.50],
    'Penticton':[49.50,-119.59],
    'Osoyoos': [49.03,-119.47],
    'Revelstoke':[51.00, -118.20], 
    'Valemount':[52.83, -119.26],
    'Golden': [51.30,-116.96],
    'Prince Rupert': [54.32, -130.32],
    'Nelson': [49.49,-117.29],
    'Vancouver':[49.28,-123.12],
    'Victoria': [48.43, 123.37],
    'Prince George': [53.92,-122.75]
    
}));

//first thing you need to do is get the web server listening
// port is a numeric address that you want to listen on
//the () is a callback function
app.listen(3000, () => console.log('server listening at 3000'));

//using express to host the static files
//anyhing in the public folder is accessible to the public,
// he uses that name to remind himself of this fact
//now we are serving up a webpage... the index.html
app.use(express.static('public'));

//need this so the server can understand incoming requests as JSON
//the options are to limit what we can recieve as data. This
//protects against someone flooding my server with data
app.use(express.json({limit: '1mb'}))

//specify get or post , need address where I want to receive this post
//and a callback function where i am going to look at the information
// coming in and send a response back
//endpoint/route where I going to recieve this info is: '/api'
// we are setting up an API for clients to send data to me.
//request - this variable holds all the data about  the information contained in this request,
//            i.e. data that is being sent and any information i need to know about this particular
//            client that is sending the request
//response - is the varialbe I can use to send things back to the client
app.post('/api', (request,response) => {
    //lets see what the request looks like
    //this shows up in the terminal, not in the client side
    //browser console 
    //console.log(request);
    // to just see the body of the request
    console.log("Woohoo, I got a request")
    //this will display on object with lat and lon
    console.log(request.body);
    const prov_data = request.body;
    //send a response back to the client, an object with some data
    //have to do something in the client to recieve the response back
    //response comes back after a fetch call as a data stream. So it is up to you
    //to define how you want to read it ( text, blob(image), json, etc). 
    //I want json and I have to handle this in the client.
    response.json({
        status:'success',
        province: prov_data.prov,
        value: prov_data.intValue
    });
});

//making the new weather route aka endpoint for a get request,
//with route parameters. so sending in the lat and lon seperated by a comma
//see  line 57 in client js

app.get('/weather/:provVal', async (request,response) => {
    //console.log(request.params);
    //turn ir into an array with the split function
    const provVal = request.params.provVal.split(',');
    //console.log(latlon);
    console.log(`From index.js ${provVal[0]} , ${provVal[1]}`);

    if (provVal[1] =='1' ||  provVal[1] == 1){
        map_object = ab_map;
    }else{
        map_object = bc_map;
    }

    let values1 = [];
    const api_key = process.env.WEATHER_API_KEY;            
       
    for(let[city,coordinates,] of map_object.entries()){ 
        
        //making the api call to OpenWeather from the server instead of the client, and then send it back 
        // calgary
        //const weather_api_url = `http://api.openweathermap.org/data/2.5/weather?lat=51.03&lon=-114.07&units=metric&appid=api_key_here`

        //const latlon = [51.03,-114.07];
        const weather_api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${api_key}`
        const weather_response = await fetch(weather_api_url);
        const weather_json = await weather_response.json();
        console.log(`Weather json from the server: ${JSON.stringify(weather_json)}`);
        //now to add another API call, just repeat the three lines above

        let current = weather_json.main.temp            
        let description = weather_json.weather[0].description
        //Getting the city from my Map                         
        values1.push([city,current,description])
        //need to leave all of this inside the promise
        //or the values list is empty
        //Create a array of objects with these attributes
        let keys = ['city','current','description'];
        let arrayOfObjects = [];            
        for(let i=0; i<values1.length; i++){        
            let obj = {};                    
        for(let j=0; j<values1[i].length; j++){
                obj[keys[j]] = values1[i][j];  
            }
            arrayOfObjects.push(obj);                                       
        }
        //sort the array of objects by descending order to get the 4 warmest temps
        sortedTemps= arrayOfObjects.sort((a, b) => parseFloat(b.current) - parseFloat(a.current));
        console.log('Sorted temps', sortedTemps)
        
    }
    // //sort the array of objects by descending order to get the 4 warmest temps
    // sortedTemps= arrayOfObjects.sort((a, b) => parseFloat(b.current) - parseFloat(a.current));
    // console.log('Sorted temps', sortedTemps)
    response.json(sortedTemps);
});
    

 