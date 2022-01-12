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
     } else {
        alert("Please choose a city.");
        }
};
     
var getCurrentDay = function(name) {
    var apiURL = "https://api.openweathermap.org/data/2.5/find?q=" + name + "&appid=5796c450ae9a19c822066f04beb985b7&units=imperial";
    fetch(apiURL).then(function(response) {
        return response.json();
        })
    .then(function(data) {
        console.log(data);
        
        //for (var i = 0; i <data.length; i++) {
            var cityItems = document.createElement('ul');
            var cityName = document.getElementById('cityHere');
            cityName.textContent = data.list[0].name;
            var cityConditions = document.createElement('li');
            cityConditions.textContent = "Conditions " + data.id;list[0].weather[0].description
            var cityTemp = document.createElement('li');
            cityTemp.textContent = "Temperature " + data.list[0].main.temp
            var cityHumidity = document.createElement('li');
            cityHumidity.textContent = "Humidity " + data.list[0].main.humidity
            var cityWind = document.createElement('li');
            cityWind.textContent = "Wind speed " + data.list[0].wind.speed
            var cityUV = document.createElement('li');
            cityUV.textContent = "UV index ";
            
            cityContainer.appendChild(cityItems);
            cityItems.appendChild(cityName);
            cityItems.appendChild(cityConditions);
            cityItems.appendChild(cityTemp);
            cityItems.appendChild(cityHumidity);
           
               
    });
}

//var displayCurrentDay = function()


startSearchEl.addEventListener("click", getCityName);

