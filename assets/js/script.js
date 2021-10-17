var apiKey = 'f9aba52981da94981ae6d22cd818ec62'; //APIKey
var cityNameArray = []; //empty array for local storage
var dateBox1 = document.getElementById('other');
var dateBox2 = document.getElementById('day-2');
var dateBox3 = document.getElementById('day-3');
var dateBox4 = document.getElementById('day-4');
var dateBox5 = document.getElementById('day-5');

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
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`)
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

                    var dailyData = data.daily;
                    console.log(dailyData);

                for (let i = 0; i < 5; i++) {
                   // console.log(dailyData[i]);
                   //let dateTime = dailyData[i].dt;
                   var date = moment.unix(dailyData.dt).format("dddd, Do");
                   let forecastTemp = dailyData[i].temp.day;
                   let humidity = "humidity: " +dailyData[i].humidity +"%";
                   let windSpeed = dailyData[i].wind_speed;
                   let dailyWeatherIcon = dailyData[i].weather.icon;
                   console.log(date, forecastTemp, humidity, windSpeed);

                   var card = $("<div>").addClass("card border m-1 w-40")
                   var cardTitle = $("<h4>").text(date);
                   var list = $("<ul>").addClass("list-group");
                   var showTemp = $("<li id='temp'>").addClass("list-group-item").text(forecastTemp);
                   var showHumid = $("<li>").addClass("list-group-item").text(humidity);
                   var showWind = $("<li>").addClass("list-group-item").text(windSpeed);
                   var cardImage = $("<src>")
                   
                   $('#five-day').append(card.append(cardTitle).append(cardImage).append(list.append(showTemp).append(showWind).append(showHumid)));

               }


                
            })

    })
}


// submit button
document.getElementById('user-form').addEventListener("submit", function (e) {
    e.preventDefault();

    let userInput = document.getElementById("cityname").value;
    search(userInput);

})