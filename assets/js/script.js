
// Grab all the References





// What Event or Trigger are we waiting for?





// What is the FLOW ??
//       When a city is entered ... then what happens?
// Button Pushed ( Event / Trigger )
//       - History Function (localStorage, dynamic generated elements)
//       - Call the API for DATA (fetch, jquery, axios) ** Ansychronous PRocess ** 
//              -- When we get data back ... What happens ??
//                      - Parse the Data (Change it to JS)
//                      - Current Weather Function 
//                      - Forcast Weather Function


var apiKey = 'f9aba52981da94981ae6d22cd818ec62'; //APIKey
var cityNameArray = []; //empty array for local storage

//search city function
function search(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f9aba52981da94981ae6d22cd818ec62`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // add the name of the city
        document.getElementById('current-city').innerHTML = data.name;
        // add the temperature
        document.getElementById('celcius').innerHTML = Math.floor(data.main.temp);
        // add the humidity
        document.getElementById('humidity').innerHTML = data.main.humidity;
        // add the wind
        document.getElementById('wnd').innerHTML = data.wind.speed

        let lon = data.coord.lon;
        let Lat = data.coord.Lat;
    })
}

// submit button
document.getElementById('user-form').addEventListener("submit", function (e) {
    e.preventDefault();
    let userInput = document.getElementById("city-name");
    search("glasgow");
})


// var getWeatherForecast = function(cityName, lon, lat) {
//var getWeatherForecast = function(cityName) {
    //console.log("function was called");

    //var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;


    //fetch(url)
        // Handeling the Promise 
        //.then(function(response) {
            //console.log("Recieved Info Back...")
            //return response.json();
        //})
        //.then(function(data) {
            //console.log("Data ...");
            // Here we are getting actual DATA back 
            //console.log(data);

            // Parse the returned Data
            //console.log(`City Name: ${data.name}`);
            //console.log(`Lat: ${data.coord.lat}`);
            //console.log(`Current Temp: ${data.main.temp}`);
        //})

    //console.log("I'm after the Fetch Method");

//};

//getWeatherForecast("Austin");