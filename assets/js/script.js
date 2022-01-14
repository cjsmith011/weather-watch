//var currentDayEl = document.querySelector(".city-deets")
var startSearchEl = document.getElementById("is-info");
var cityInputEl = document.getElementById('city');
var cityContainer = document.getElementById('city-deets');

var getCityName = function(event) {
    //get the city name from the search box
    event.preventDefault();
    var searchCity = cityInputEl.value.trim();
    if(searchCity) {
        getCurrentDay(searchCity);
        console.log(searchCity);
        getForecast(searchCity);
     } else {
        alert("Please choose a city or provide just the name of the city.");
        }
};
     
var getCurrentDay = function(name) {
    var apiURL = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=UCqiTrpHfka3AP7MAaQAp5iVWw9ynNdp&q=" + name;
    fetch(apiURL).then(function(response) {
        return response.json();
        })
    .then(function(data) {
       // Build the city details div
            var cityItems = document.createElement('ul');
            //cityItems.setAttribute("list-style-type", "disc");
            var cityName = document.getElementById('cityHere');
            cityName.textContent = data.list[0].name;
            var cityConditions = document.createElement('li');
            cityConditions.textContent = "Conditions: " + data.list[0].weather[0].description;
            var cityTemp = document.createElement('li');
            cityTemp.textContent = "Temperature: " + data.list[0].main.temp + " ºF";
            var cityHumidity = document.createElement('li');
            cityHumidity.textContent = "Humidity: " + data.list[0].main.humidity +"%";
            var cityWind = document.createElement('li');
            cityWind.textContent = "Wind speed: " + data.list[0].wind.speed + "MPH";
            var cityUV = document.createElement('li');
            cityUV.textContent = "UV index ";
            
            cityContainer.appendChild(cityItems);
            cityItems.appendChild(cityName);
            cityItems.appendChild(cityConditions);
            cityItems.appendChild(cityTemp);
            cityItems.appendChild(cityHumidity);
            cityItems.appendChild(cityWind);
           
               
    });
}

var getCityKey = function(name) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=5796c450ae9a19c822066f04beb985b7&units=imperial";
    fetch(forecastURL).then(function(response) {
        return response.json();
        })
    .then(function(data) {
        console.log(data);
        //Get 5 days of data
        var forecastItems = document.createElement('ul');
            //cityItems.setAttribute("list-style-type", "disc");
            var date = document.createElement('li');
            date.textContent = data.list.dt;
            var cityName = document.getElementById('cityHere');
            cityName.textContent = data.list[0].name;
            var cityConditions = document.createElement('li');
            cityConditions.textContent = "Conditions: " + data.list[0].weather[0].description;
            var cityTemp = document.createElement('li');
            cityTemp.textContent = "Temperature: " + data.list[0].main.temp + " ºF";
            var cityHumidity = document.createElement('li');
            cityHumidity.textContent = "Humidity: " + data.list[0].main.humidity +"%";
            var cityWind = document.createElement('li');
            cityWind.textContent = "Wind speed: " + data.list[0].wind.speed + "MPH";
            var cityUV = document.createElement('li');
            cityUV.textContent = "UV index ";
            
            cityContainer.appendChild(cityItems);
            cityItems.appendChild(cityName);
            cityItems.appendChild(cityConditions);
            cityItems.appendChild(cityTemp);
            cityItems.appendChild(cityHumidity);
            cityItems.appendChild(cityWind);
           
    });
}


startSearchEl.addEventListener("click", getCityName);

