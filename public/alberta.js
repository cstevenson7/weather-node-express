//getTop4 is called from the buttons on thje AB.html and the buttons on the bc.htm
//try event listener instead
const getTop4 = async intValue =>{             

    if(intValue === '1'|| intValue === 1){
        //map_object = ab_map;
        // prov_obj = ab_map
        // console.log(`alberta ${prov_obj}`)
        prov = 'ab'
    }else{
        //map_object = bc_map;
        //prov_obj = ab_map
    }
    //now send the province to the server to do the api calls
    //create an object to send the data that we retrieved from the geolocation function
        const prov_obj = {prov,intValue};
        
        //setting up a POST fetch function, sending the lat & lon to the our '/api' route on the server
        //we want the body... the body of the post request is where I am packaging up all of my data
        //JSON.stringify(data) - take the javaScript object data from above(line38)and turn it into a JSON string
        //since we are sending data in a json format. It is good to specify that in a header
        //this is the basic info : I want this data to be sent as json, I want to tell you that it is going to be json and I want to post it to the API
        //the method  and headers are called properties of options, hover to see
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(prov_obj)
        }

        //This is for data coming back from the server
        //fetch returns a promise, so I can handle the response sent for the server(line 45) here
        // //but need to add an await from the async function on line33
        const response = await fetch('/api', options);
        const server_json = await response.json()
        console.log(server_json); 

        //change this url to a local path got the weather endpoint we created
        //and then console log it here 

        const weather_api_url = `weather/${prov}, ${intValue}`
        //hard coding lat _ lon to test
        //const weather_api_url = `/weather`;
        const api_response = await fetch(weather_api_url);
        const api_json = await api_response.json();
        console.log(`From client weather API: ${JSON.stringify(api_json)}`);
        //now I have a array of objects (api_json) send back from the server

        //creates arrays so we can dynamically change 
        //variable names in for loop
        let ab_city = [];
        let ab_current = [];
        let ab_description= [];  
        for (let i = 0; i < 4; i++){                        
            ab_city[i] = api_json[i].city                    
            ab_current[i] = api_json[i].current
            ab_description[i] = api_json[i].description                   
            intValue = 1
            if(intValue === '1'|| intValue === 1){
                if(i == 0){
                    let city = api_json[i].city
                    let city_txt = document.querySelector('#ab_city1')        
                    city_txt.innerHTML= city                        
        
                    let current = api_json[i].current
                    let current_txt = document.querySelector('#ab_current1')
                    let current_c =  `${current} C`
                    current_txt.innerHTML= current_c
        
                    let description = api_json[i].description
                    let description_txt = document.querySelector('#ab_description1')        
                    description_txt.innerHTML= description            

                }else if(i==1){
                    let city = api_json[i].city
                    let city_txt = document.querySelector('#ab_city2')        
                    city_txt.innerHTML= city
        
                    let current = api_json[i].current
                    let current_txt = document.querySelector('#ab_current2')
                    let current_c =  `${current} C`
                    current_txt.innerHTML= current_c
        
                    let description = api_json[i].description
                    let description_txt = document.querySelector('#ab_description2')        
                    description_txt.innerHTML= description

                }else if(i==2){
                    let city = api_json[i].city
                    let city_txt = document.querySelector('#ab_city3')        
                    city_txt.innerHTML= city
        
                    let current = api_json[i].current
                    let current_txt = document.querySelector('#ab_current3')
                    let current_c =  `${current} C`
                    current_txt.innerHTML= current_c
        
                    let description = api_json[i].description
                    let description_txt = document.querySelector('#ab_description3')        
                    description_txt.innerHTML= description  
                }else{
                    let city = api_json[i].city
                    let city_txt = document.querySelector('#ab_city4')        
                    city_txt.innerHTML= city
        
                    let current = api_json[i].current
                    let current_txt = document.querySelector('#ab_current4')
                    let current_c =  `${current} C`
                    current_txt.innerHTML= current_c
        
                    let description = api_json[i].description
                    let description_txt = document.querySelector('#ab_description4')        
                    description_txt.innerHTML= description  
                }
            }
        }
                        
};



