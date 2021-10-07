
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

var longLat = function(cityName) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    //fetch the long/lat
    fetch(weatherUrl) //handling the promise
    .then(function(response) {
        console.log("received info back")
        return response.json(); 
    })
}


// var getWeatherForecast = function(cityName, lon, lat) {
var getWeatherForecast = function(cityName) {
    console.log("function was called");

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;


    fetch(url)
        // Handeling the Promise 
        .then(function(response) {
            console.log("Recieved Info Back...")
            return response.json();
        })
        .then(function(data) {
            console.log("Data ...");
            // Here we are getting actual DATA back 
            console.log(data);

            // Parse the returned Data
            console.log(`City Name: ${data.name}`);
            console.log(`Lat: ${data.coord.lat}`);
            console.log(`Current Temp: ${data.main.temp}`);
        })

    console.log("I'm after the Fetch Method");

};

getWeatherForecast("Austin");