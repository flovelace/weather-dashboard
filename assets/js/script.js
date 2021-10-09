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
        document.getElementById('wnd').innerHTML = data.wind.speed;
        // append the weather icons
        let weatherIcons = data.weather[0].icon;
        document.getElementById('weatherIcon').setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcons}@2x.png`);

        // the lat and lon are required so we can make our second api call to OneCall
        let lon = data.coord.lon;
        let lat = data.coord.lat;

        // Now we have Lat and Long Values
        // We have to make a second request (to another API address)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {

                document.getElementById('uv-indx').innerHTML = data.current.uvi;

                // add the warning colours to the uvi
                if (document.getElementById('uv-indx').innerHTML < 3) {
                    document.getElementById('uv-indx').classList.add("good");
                    document.getElementById('uv-indx').classList.remove("ok");
                    document.getElementById('uv-indx').classList.remove("bad")
                } else if (document.getElementById('uv-indx').innerHTML >= 3 && document.getElementById('uv-indx').innerHTML <= 5) {
                    document.getElementById('uv-indx').classList.remove("good");
                    document.getElementById('uv-indx').classList.add("ok");
                    document.getElementById('uv-indx').classList.remove("bad");
                } else {
                    document.getElementById('uv-indx').classList.remove("good");
                    document.getElementById('uv-indx').classList.remove("ok");
                    document.getElementById('uv-indx').classList.add("bad")
                }

                for (var i = 0; i <=5; i++) {
                    var dailyData = data.daily.dt[i];
                    console.log(dailyData);
                    document.getElementById("date" + i).innerHTML = new Date(dailyData.dt * 1000).toLocaleDateString();
                    document.getElementById("img" + i).src = "https://openweathermap.org/img/wn/" + dayData.weather[0].icon + ".png";
                    document.querySelector(".temp" + i).innerHTML = "Temp: " + dailyData.temp.day + " °C";
                    document.querySelector(".humidity" + i).innerHTML = "Humidity: " + dailyData.humidity + " %";
                    document.querySelector(".wind" + i).innerHTML = "Wind: " + dailyData.wind.speed + " ";
                }
                
            })

    })
}


// submit button
document.getElementById('user-form').addEventListener("submit", function (e) {
    e.preventDefault();
    // let userInputElement = document.getElementById("cityname");
   // console.log(userInputElement);

    let userInput = document.getElementById("cityname").value;
    search(userInput);

})