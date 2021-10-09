
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // append the name of the city
        document.getElementById('current-city').innerHTML = data.name;
        // append the temperature. Use math floor to round so we don't have decimals
        document.getElementById('celcius').innerHTML = Math.floor(data.main.temp);
        // append the humidity
        document.getElementById('humidity').innerHTML = data.main.humidity;
        // append the wind
        document.getElementById('wnd').innerHTML = data.wind.speed
        // append the weather icons
        let weatherIcons = data.weather[0].icon;
        document.getElementById('weatherIcon').setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcons}@2x.png`);

        console.log(data);   // <-- Find the Weather Icon
        // the lat and lon are required so we can make our second api call to OneCall
        let lon = data.coord.lon;
        let lat = data.coord.lat;
        console.log(lat, lon);

        // Now we have Lat and Long Values
        // We have to make a second request (to another API address)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)

                console.log(data.current.uvi);
                console.log(data.daily);

                document.getElementById('uv-indx').innerHTML = data.current.uvi;
            })
    })
}


function forecast(lat, lon) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            console.log(data.current.uvi);
            console.log(data.daily);
        })
}


// submit button
document.getElementById('user-form').addEventListener("submit", function (e) {
    e.preventDefault();
    // let userInputElement = document.getElementById("cityname");
   // console.log(userInputElement);

    let userInput = document.getElementById("cityname").value;
    console.log(userInput);
    search(userInput);

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