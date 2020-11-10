# Weather app
Displays the warmest 4 locations in Alberta or BC based on current conditions
reported by OpenWeather API.Used Leaflet create markers for the warmest locations. 
11 selected Alberta location and 15 selected BC locations
Node.js, Express, node-fetch, dotenv
http://localhost:3000

# if you get [object Object]
need to do this console.log(`From client both API's: ${JSON.stringify(api_json)}`);

# to get degree symbol -  alt 0176

# changed all innerHTML to textContent from my original code
from developer.mozilla.org
Element.innerHTML returns HTML, as its name indicates. Sometimes people use innerHTML
to retrieve or write text inside an element,  but textContent has better performance
because its value is not parsed as HTML. Moreover, using textContent can prevent XSS attacks.

# to deploy on heroku with the CLI (command line interface)

need to change the port to this:

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
  });

To verify your CLI installation, use the heroku --version command:
CMD heroku login

to see what remote you have:
CMD git remote -v   
now you  should just see the github ones


add a heroku remote
CMD heroku git:remote -a weather-node-express-cs
now you should see 4


CMD git push heroku master 
- then open up app- app opened but no temps or aq's

Don't need .env file or dotenv for heroku - can set environmental variables
directly
CMD heroku config

now add the actual key here
CMD heroku config:set API_KEY=72f...

Don't forget the server is storing the database, it cannot be shared between deployments, if I delpoyed on Glitch as well.
If you need to make a change to the code after you have deployed in Heroku, you have to go through the sets of:
lohin into heroku
git add .
git commit -n "made changes"
git push heroku master

Heroku automatically redeploys the app once you push to heroku master = these changes DO NOT push to github -  need to do a git push origin master

