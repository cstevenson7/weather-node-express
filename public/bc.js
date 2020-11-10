// Leaflet map code 
const mymap = L.map('checkinMap').setView([52.28, -122.70], 5);
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
    const prov = 'bc';
    const intValue = 2;
    //now send the province to the server to do the api calls    
        const prov_obj = {prov,intValue};        
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(prov_obj)
        }

        const response = await fetch('/api', options);
        const server_json = await response.json();
        //console.log(server_json); 

        const weather_api_url = `weather/${prov}, ${intValue}`;

        const api_response = await fetch(weather_api_url);
        const api_json = await api_response.json();
        //console.log(`From client weather API: ${JSON.stringify(api_json)}`);
        //now I have a sorted array of objects (api_json) send back from the server

        //creates arrays so we can dynamically change 
        //variable names in for loop
        let bc_city = [];
        let bc_coordinates = [];
        let bc_current = [];
        let bc_description= [];  
        for (let i = 0; i < 4; i++){                        
            bc_city[i] = api_json[i].city;
            bc_coordinates[i]  =  api_json[i].coordinates;                      
            bc_current[i] = api_json[i].current;
            bc_description[i] = api_json[i].description;                   
            
            if(i == 0){
                let city = api_json[i].city;
                let city_txt = document.querySelector('#bc_city1');        
                city_txt.textContent= city;
    
                let current = api_json[i].current;
                let current_txt = document.querySelector('#bc_current1');
                let current_c =  `${current}° C`;
                current_txt.textContent= current_c;

                let marker = L.marker([bc_coordinates[i][0], bc_coordinates[i][1]]).addTo(mymap);                    
                let txt = `${bc_city[i]} ${current}° C`;
                 //putting text in the marker bindPopup Leaflet function
                marker.bindPopup(txt);
    
                let description = api_json[i].description;
                let description_txt = document.querySelector('#bc_description1');        
                description_txt.textContent= description;            

            }else if(i==1){
                let city = api_json[i].city;
                let city_txt = document.querySelector('#bc_city2');        
                city_txt.textContent= city;
    
                let current = api_json[i].current;
                let current_txt = document.querySelector('#bc_current2');
                let current_c =  `${current}° C`;
                current_txt.textContent= current_c;

                let marker = L.marker([bc_coordinates[i][0], bc_coordinates[i][1]]).addTo(mymap);                    
                let txt = `${bc_city[i]} ${current}° C`;
                 //putting text in the marker bindPopup Leaflet function
                marker.bindPopup(txt);
    
                let description = api_json[i].description;
                let description_txt = document.querySelector('#bc_description2');        
                description_txt.textContent= description;

            }else if(i==2){
                let city = api_json[i].city;
                let city_txt = document.querySelector('#bc_city3');        
                city_txt.textContent= city;
    
                let current = api_json[i].current;
                let current_txt = document.querySelector('#bc_current3');
                let current_c =  `${current}° C`;
                current_txt.textContent= current_c;

                let marker = L.marker([bc_coordinates[i][0], bc_coordinates[i][1]]).addTo(mymap);                    
                let txt = `${bc_city[i]} ${current}° C`;
                 //putting text in the marker bindPopup Leaflet function
                marker.bindPopup(txt);
    
                let description = api_json[i].description;
                let description_txt = document.querySelector('#bc_description3');        
                description_txt.textContent= description;  
            }else{
                let city = api_json[i].city;
                let city_txt = document.querySelector('#bc_city4');       
                city_txt.textContent= city;
    
                let current = api_json[i].current;
                let current_txt = document.querySelector('#bc_current4');
                let current_c =  `${current}° C`;
                current_txt.textContent= current_c;

                let marker = L.marker([bc_coordinates[i][0], bc_coordinates[i][1]]).addTo(mymap);                    
                let txt = `${bc_city[i]} ${current}° C`;
                 //putting text in the marker bindPopup Leaflet function
                marker.bindPopup(txt);
    
                let description = api_json[i].description;
                let description_txt = document.querySelector('#bc_description4');        
                description_txt.textContent= description;  
                }
            
        }
                        
};

getTop4();



