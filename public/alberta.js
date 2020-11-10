// Leaflet map code 
const mymap = L.map('checkinMap').setView([52.48, -113.70], 5);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
//this and two lines of code in the html adds the full screen control to the map
mymap.addControl(new L.Control.Fullscreen());


const getTop4 = async () =>{             
    const prov = 'ab';
    const intValue = 1;

    //now send the province to the server to do the api calls
        const prov_obj = {prov,intValue};
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(prov_obj)
        }

        //This is for data coming back from the server

        const response = await fetch('/api', options);
        const server_json = await response.json();
        //console.log(server_json); 

        const weather_api_url = `weather/${prov}, ${intValue}`;

        const api_response = await fetch(weather_api_url);
        const api_json = await api_response.json();
        console.log(`From response sent from server now in client js the weather API: ${JSON.stringify(api_json)}`);
        //now I have a sorted by temperature array of objects (api_json) send back from the server

        //creates arrays so we can dynamically change 
        //variable names in for loop
        let ab_city = [];
        let ab_coordinates = [];
        let ab_current = [];
        let ab_description= []; 

        //getting the 4 warmest temperatures
        for (let i = 0; i < 4; i++){                        
            ab_city[i] = api_json[i].city; 
            ab_coordinates[i]  =  api_json[i].coordinates;                
            ab_current[i] = api_json[i].current;
            ab_description[i] = api_json[i].description;                   
       
            if(intValue === '1'|| intValue === 1){
                if(i == 0){
                    let city = api_json[i].city;
                    let city_txt = document.querySelector('#ab_city1');        
                    city_txt.textContent= city;                    

                    let current = api_json[i].current;
                    let current_txt = document.querySelector('#ab_current1');
                    let current_c =  `${current}° C`;
                    current_txt.textContent= current_c;

                    let marker = L.marker([ab_coordinates[i][0], ab_coordinates[i][1]]).addTo(mymap);                    
                    let txt = `${ab_city[i]} ${current}° C`;
                     //putting text in the marker bindPopup Leaflet function
                    marker.bindPopup(txt);
        
                    let description = api_json[i].description;
                    let description_txt = document.querySelector('#ab_description1');        
                    description_txt.textContent= description;           

                }else if(i==1){
                    let city = api_json[i].city;
                    let city_txt = document.querySelector('#ab_city2');        
                    city_txt.textContent= city;
        
                    let current = api_json[i].current;
                    let current_txt = document.querySelector('#ab_current2');
                    let current_c =  `${current}° C`;
                    current_txt.textContent= current_c;

                    let marker = L.marker([ab_coordinates[i][0], ab_coordinates[i][1]]).addTo(mymap);
                    let txt = `${ab_city[i]} ${current}° C`;
                     //putting text in the marker bindPopup Leaflet function
                    marker.bindPopup(txt);
        
                    let description = api_json[i].description;
                    let description_txt = document.querySelector('#ab_description2');        
                    description_txt.textContent= description;

                }else if(i==2){
                    let city = api_json[i].city;
                    let city_txt = document.querySelector('#ab_city3');        
                    city_txt.textContent= city;
        
                    let current = api_json[i].current;
                    let current_txt = document.querySelector('#ab_current3');
                    let current_c =  `${current}° C`;
                    current_txt.textContent= current_c;

                    let marker = L.marker([ab_coordinates[i][0], ab_coordinates[i][1]]).addTo(mymap);
                    let txt = `${ab_city[i]} ${current}° C`;
                     //putting text in the marker bindPopup Leaflet function
                    marker.bindPopup(txt);
        
                    let description = api_json[i].description;
                    let description_txt = document.querySelector('#ab_description3');        
                    description_txt.textContent= description;  
                }else{
                    let city = api_json[i].city;
                    let city_txt = document.querySelector('#ab_city4');       
                    city_txt.textContent= city;
        
                    let current = api_json[i].current;
                    let current_txt = document.querySelector('#ab_current4');
                    let current_c =  `${current}° C`;
                    current_txt.textContent= current_c;

                    let marker = L.marker([ab_coordinates[i][0], ab_coordinates[i][1]]).addTo(mymap);
                    let txt = `${ab_city[i]} ${current}° C`;
                     //putting text in the marker bindPopup Leaflet function
                    marker.bindPopup(txt);
        
                    let description = api_json[i].description;
                    let description_txt = document.querySelector('#ab_description4');        
                    description_txt.textContent= description;  
                }
            }
        }
                        
};

getTop4();


