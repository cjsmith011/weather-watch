var currentDayEl = document.querySelector("#city-deets")
var startSearchEl = document.querySelector(".is-info");
var cityInputEl = document.querySelector("#city");
var cityContainer = document.getElementById('city-deets');

var getCityName = function(event) {
    //get the city name from the search box
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if(cityName) {
        getCurrentDay(cityName);
        cityInputEl ="";
    } else {
        alert("Please choose a city.");
        }
        console.log(event);
    
     }


var getCurrentDay = function() {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Detroit&appid=5796c450ae9a19c822066f04beb985b7&units=imperial";
    fetch(apiURL).then(function(response) {
        return response.json();
        })
    .then(function(data) {
        console.log(data.main.temp, data.main.humidity);
        //for (var i = 0; i <data.length; i++) {
            var cityItems = document.createElement('ul');
            var cityTemp = document.createElement('li');
            cityTemp.textContent = "Temperature " + data.main.temp;
            var cityHumidity = document.createElement('li');
            cityHumidity.textContent = "Humidity " + data.main.humidity;
          
            cityContainer.appendChild(cityItems);
            cityItems.appendChild(cityTemp);
            cityItems.appendChild(cityHumidity);

                  
    });
}
//var displayCurrentDay = function()



startSearchEl.addEventListener("click", getCityName);

getCurrentDay();