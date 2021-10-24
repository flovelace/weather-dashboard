$(document).ready(function() {

    var apiKey = 'f9aba52981da94981ae6d22cd818ec62'; //APIKey
    var searchHistory = []; //empty array to hold search history

    //search city function
    function search(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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
                    console.log(data);
                    document.getElementById('uv-indx').innerHTML = data.current.uvi;

                    // add the warning colours to the uvi
                    console.log(parseInt($("#uv-indx").text()));
                    if(parseInt($("#uv-indx").text()) < 3) {
                  //  if (document.getElementById('uv-indx').innerHTML < 3) {
                        //$("#uv-indx").addClass("good");
                        document.getElementById('uv-indx').classList.add("good");
                        //$("#uv-indx").removeClass("ok");
                        document.getElementById('uv-indx').classList.remove("ok");
                        document.getElementById('uv-indx').classList.remove("bad")
                    } else if (parseInt($("#uv-indx").text()) >= 3 && parseInt($("#uv-indx").text()) <= 5) {
       //   } else if (document.getElementById('uv-indx').innerHTML >= 3 && document.getElementById('uv-indx').innerHTML <= 5) {
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
                    var date = moment.unix(dailyData[i].dt).format("ddd, Do, YYYY");
                    let forecastTemp = dailyData[i].temp.day;
                    console.log(Math.floor(forecastTemp));
                    let humidity = "Humidity: " +dailyData[i].humidity +"%";
                    let windSpeed = "Wind Speed: " +dailyData[i].wind_speed +"KM/H";
                    let dailyWeatherIcon = dailyData[i].weather[0].icon;
                    console.log(date, forecastTemp, humidity, windSpeed, dailyWeatherIcon);

                    var card = $("<div>").addClass("card border m-1 w-40")
                    var cardTitle = $("<h5>").text(date);
                    var list = $("<ul>").addClass("list-group");
                    var showTemp = $("<li id='temp'>").addClass("list-group-item").text(Math.floor(forecastTemp)+"°C");
                    var showHumid = $("<li>").addClass("list-group-item").text(humidity);
                    var showWind = $("<li>").addClass("list-group-item").text(windSpeed);
                    var cardImage = $("<img>").addClass("list-group-item").attr("src",`http://openweathermap.org/img/wn/${dailyWeatherIcon}@2x.png`);
                    
                    $('#five-day').append(card.append(cardTitle).append(cardImage).append(list.append(showTemp).append(showWind).append(showHumid)));

                }
                    
                })

        })
    }


    // submit button
    document.getElementById('user-form').addEventListener("submit", function (e) {
        e.preventDefault();

        // Clearout any ELEMENT in the FORECAST Container
        $("#five-day").empty();
        let userInput = document.getElementById("cityname").value;
        search(userInput);

    })


});