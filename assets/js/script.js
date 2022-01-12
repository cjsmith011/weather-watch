var currentDayEl = document.querySelector("#city-deets")


var getCurrentDay = function() {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Detroit&appid=5796c450ae9a19c822066f04beb985b7";
    fetch(apiURL).then(function(response) {
        return response.json();
        })
    .then(function(data) {
        console.log(data);
        for (var i = 0; i <data.length; i++) {
            console.log(data[i].main.temp)
            console.log(data[i].temp)
        }
    })
//var displayCurrentDay = function()



};

getCurrentDay();