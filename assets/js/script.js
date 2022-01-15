
var startSearchEl = document.getElementById("is-info");
var cityInputEl = document.getElementById('city');
var cityContainer = document.getElementById('city-deets');
var day1Container = document.getElementById('days');
var date = new Date();
var historyContainer = document.getElementById('history');
var noResults = document.getElementById('noCityFound');
var recallSearchEl = document.getElementById('recall');
var cities = [];

//get user input for city to search
var getCityName = function(event) {
    //get the city name from the search box
    event.preventDefault();
    var searchCityST = cityInputEl.value.trim();
    if(searchCityST) {
        //clear the previous weather information when the next city is input by the user
        cityContainer.textContent = "";
        day1Container.textContent = "";
      
        //start the location key api and the city weather api
        getLocation(searchCityST);
        saveCity(searchCityST);
     } 
};

//save the searched cities to local storage and make them clickable buttons
var saveCity = function(city) {
    if (cities.indexOf(city) !== -1) {
        return;
    } 
    cities.push(city);
    localStorage.setItem("city", JSON.stringify(cities));
 
    var cityHistory = document.createElement('ul');
    var citySearched = document.createElement('li');
    var cityButton = document.createElement('button');
    cityButton.className = "button is-primary is-fullwidth is-active";
    //cityButton.id = "recall";
    cityButton.textContent = city;

    historyContainer.appendChild(cityHistory);
    cityHistory.appendChild(citySearched);
    citySearched.appendChild(cityButton);
    //allow the button to be used to start the local storage retrieval
    //recallSearchEl.addEventListener("click", recallSearch);
    recallSearch();
}
//pull the cities back from local storage
var recallSearch = function () {
    var getCities = localStorage.getItem("city");
    
    console.log(getCities);
        if (!getCities) {
            return false;
        }
        console.log("did we retrieve?????");
        
        getCities = JSON.parse(getCities);
        // for (var i = 0; i < getCities.length; i++) {
        //     historyContainer(getCities[i]);
        }


//pass the city,st into the location api
var getLocation = function(name) {
    var locationURL = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=UCqiTrpHfka3AP7MAaQAp5iVWw9ynNdp&q=" + name;
    fetch(locationURL).then(function(response) {
        return response.json();
    
        })
    .then(function(data) {
        if (data.length === 0) {
        //if no city/state found, let the user know to try again
     
        var noCityFound = document.createElement('h4');
        noCityFound.textContent = "Not found.  Please type in a city,state or zip.";

        noResults.appendChild(noCityFound);
        getCityName();
        } else {
        var cityKey = data[0].Key;
        getCurrentForecast(cityKey);
        get5dayForecast(cityKey);
    }
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
            var cityConditions = document.createElement('li');
            cityConditions.textContent = "Conditions: " + data.DailyForecasts[0].Day.IconPhrase;
            var cityTempHigh = document.createElement('li');
            cityTempHigh.textContent = "High temp for the day: " + data.DailyForecasts[0].Temperature.Maximum.Value + " ºF";
            var cityTempLow = document.createElement('li');
            cityTempLow.textContent = "Low temp for the day: " + data.DailyForecasts[0].Temperature.Minimum.Value + " ºF";
            
            cityContainer.appendChild(cityItems);
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
            var day1Items = document.createElement('ul');
            day1Items.setAttribute("class", "box");
            var dayDate = document.createElement('li');
            dayDate.textContent = "Date: " + data.DailyForecasts[i].Date;
            var cityConditions = document.createElement('li');
            cityConditions.textContent = "Conditions: " + data.DailyForecasts[i].Day.IconPhrase;
            var cityTempHigh = document.createElement('li');
            cityTempHigh.textContent = "High temp for the day: " + data.DailyForecasts[i].Temperature.Maximum.Value + " ºF";
            var cityTempLow = document.createElement('li');
            cityTempLow.textContent = "Low temp for the day: " + data.DailyForecasts[i].Temperature.Minimum.Value + " ºF";
            
            day1Container.appendChild(day1Items);
            day1Items.appendChild(dayDate);
            day1Items.appendChild(cityConditions);
            day1Items.appendChild(cityTempHigh);
            day1Items.appendChild(cityTempLow);
    };
});
}

// function getHistory ()

// }


startSearchEl.addEventListener("click", getCityName);


