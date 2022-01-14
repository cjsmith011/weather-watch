//var currentDayEl = document.querySelector(".city-deets")
var startSearchEl = document.getElementById("is-info");
var cityInputEl = document.getElementById('city');
var cityContainer = document.getElementById('city-deets');
var day1Container = document.getElementById('days');
var date = new Date();


//get user input for city to search
var getCityName = function(event) {
    //get the city name from the search box
    event.preventDefault();
    var searchCityST = cityInputEl.value.trim();
    if(searchCityST) {
        getLocation(searchCityST);
        saveCity(searchCityST);
     } else {
        alert("Please choose a city or provide just the name of the city.");
        }
};

var saveCity = function(city) {
    localStorage.setItem(city, JSON.stringify(city));
    console.log(city);

}

//pass the city,st into the location api
var getLocation = function(name) {
    var locationURL = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=UCqiTrpHfka3AP7MAaQAp5iVWw9ynNdp&q=" + name;
    fetch(locationURL).then(function(response) {
        return response.json();
    
        })
    .then(function(data) {
        var cityKey = data[0].Key;
        getCurrentForecast(cityKey);
        get5dayForecast(cityKey);
    });
}

//pass the location key into the forecast api
var getCurrentForecast = function(key) {
            var forecastURL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + ".json?apikey=UCqiTrpHfka3AP7MAaQAp5iVWw9ynNdp";
            fetch(forecastURL).then(function(response) {
                return response.json();
                })
            .then(function(data) {
       // Build the city details div
            var cityItems = document.createElement('ul');
            var cityName = document.getElementById('cityHere');
            cityName.textContent = cityInputEl.textContent;
            var cityConditions = document.createElement('li');
            cityConditions.textContent = "Conditions: " + data.DailyForecasts[0].Day.IconPhrase;
            var cityTempHigh = document.createElement('li');
            cityTempHigh.textContent = "High temp for the day: " + data.DailyForecasts[0].Temperature.Maximum.Value + " ºF";
            var cityTempLow = document.createElement('li');
            cityTempLow.textContent = "Low temp for the day: " + data.DailyForecasts[0].Temperature.Minimum.Value + " ºF";
            
            cityContainer.appendChild(cityItems);
            cityItems.appendChild(cityName);
            cityItems.appendChild(cityConditions);
            cityItems.appendChild(cityTempHigh);
            cityItems.appendChild(cityTempLow);
                        
    });
}
//grab the same url results and use in 5 day forecast
var get5dayForecast = function(key) {
        var forecastURL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + ".json?apikey=UCqiTrpHfka3AP7MAaQAp5iVWw9ynNdp";
        fetch(forecastURL).then(function(response) {
            return response.json();
            })
        .then(function(data) {
            // Build the 5 day forecast
        
            currentIndex = 0;
          
            for (i = 1; i < data.DailyForecasts.length; i++) {
            var day1Items = document.createElement('div');
            day1Items.setAttribute("class", "eachday");
            var dayDate = document.createElement('p');
            dayDate.textContent = "Date: " + data.DailyForecasts[i].Date;
            var cityConditions = document.createElement('p');
            cityConditions.textContent = "Conditions: " + data.DailyForecasts[i].Day.IconPhrase;
            var cityTempHigh = document.createElement('p');
            cityTempHigh.textContent = "High temp for the day: " + data.DailyForecasts[i].Temperature.Maximum.Value + " ºF";
            var cityTempLow = document.createElement('p');
            cityTempLow.textContent = "Low temp for the day: " + data.DailyForecasts[i].Temperature.Minimum.Value + " ºF";
            
            day1Container.appendChild(day1Items);
            day1Items.appendChild(dayDate);
            day1Items.appendChild(cityConditions);
            day1Items.appendChild(cityTempHigh);
            day1Items.appendChild(cityTempLow);
    };
});
}


startSearchEl.addEventListener("click", getCityName);

