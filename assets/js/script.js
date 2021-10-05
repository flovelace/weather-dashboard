var getWeatherForecast = function(cityName, lon, lat) {
    console.log("function was called");
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=46a771b50df6b51953e472b7b572108a";

    var response = fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
            }
            )
        }
    })
};

getWeatherForecast();