var rootURL = "https://api.openweathermap.org";
// change out api with the one i receive in my email
var apiKey = '0ba7616b3965de830217c6f2777b4ff3';
var dayOfTheWeek = dayjs().format("(MM/DD/YYYY)");

function search(city) {
  $(".city-data").empty()
  $(".five-day").empty()
  $(".title-five-day").empty()
  // using backticks to make javascript read what i type literally
  // fetch(`${rootURL}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      var iconCode = data.weather[0].icon
      var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`
    
      var currentForcast = $(`
      <h2>${data.name} ${dayOfTheWeek}</h2>
      <div><img src="${iconURL}" alt="${data.weather[0].description}"/></div>
      <p>Temperature: ${data.main.temp} °F</p>
      <p>Humidity: ${data.main.humidity}% </p>
      <p>Wind speed: ${data.wind.speed} mph</p>
      `)
      $(".city-data").append(currentForcast);
      $(".main-search-results").addClass("border border-dark")
           // Append in a button under the Search Bar
     var resultItem = document.createElement("button");
     resultItem.setAttribute("class", "history")
     resultItem.setAttribute("display", "block")
     resultItem.textContent = data.name
     $(".col-3").append(resultItem)
  
      var cityLongitude = data.coord.lon
      var cityLatitude = data.coord.lat 
      

      fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
          console.log(data, "here")

          var fiveDayForecast = data.list.filter(day => day.dt_txt.includes("12:00:00"))
            for (let i = 0; i < fiveDayForecast.length; i++) {
              var icon = fiveDayForecast[i].weather[0].icon
              var iconImage = "https://openweathermap.org/img/wn/" + icon + ".png"
              var currentDate = new Date(fiveDayForecast[i].dt_txt).toLocaleString().split(",")[0]
              var fiveDayCard = $(`
              <div class= "pl-3">
              <div class= "card pl-3 pt-3 mb-3 bg-primary text-light" style= "width: 11rem">
              <div class= "card-body">
              <p>${currentDate}</p>
              <p><img src="${iconImage}"/></p>
              <p>Temp: ${fiveDayForecast[i].main.temp} °F</p>
              <p>Wind: ${fiveDayForecast[i].wind.speed} mph</p>
              <p>Humidity: ${fiveDayForecast[i].main.humidity}%</p>
              </div>
              </div>
              </div>
              
              `)
              $(".five-day").append(fiveDayCard)
              
            }
            $(".title-five-day").append("5-Day Forecast:")
        })
    })
savingSearch()
}

      function displayWeatherData(event) {
        event.preventDefault();
        $(".main-search-results").empty()
      }

// creating a function to make the appended buttons go to the weather data for the city
   function savingSearch () {
    var searchVal = $("#search").val()
    // console.log(JSON.parse(localStorage.getItem("searchHistory")))
    var searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"))||[]
    console.log(searchHistoryArray);
    searchHistoryArray.push(searchVal)
    searchHistoryArray.forEach(function(score) {
    })

    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray))
   }






$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // .trim takes out the white spaces like if you add a space when searching
    var city = $("#search").val().trim();
    search(city)
    $("#search").val("")
})

$("#history").on("click", function(event) {
  event.preventDefault();
  console.log("hello")
})


// create a function for saving the search in local storage.  Create buttons that append from local storage. Each button represents the city searched.

// init is a function name that refers to being called on page load
function init() {
  var searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"))||[]
  searchHistoryArray.forEach(city => {
    var resultItem = document.createElement("button");
    resultItem.setAttribute("class", "history")
    resultItem.setAttribute("id", city)
    resultItem.setAttribute("display", "block")
    resultItem.textContent = city
    $(".col-3").append(resultItem)
  })

}

init()

function searchSavedCity(pastCity) {
  $(".city-data").empty()
  $(".five-day").empty()
  $(".title-five-day").empty()
  // using backticks to make javascript read what i type literally
  // fetch(`${rootURL}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + pastCity + "&units=imperial&appid=" + apiKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      var iconCode = data.weather[0].icon
      var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`
    
      var currentForcast = $(`
      <h2>${data.name} ${dayOfTheWeek}</h2>
      <div><img src="${iconURL}" alt="${data.weather[0].description}"/></div>
      <p>Temperature: ${data.main.temp} °F</p>
      <p>Humidity: ${data.main.humidity}% </p>
      <p>Wind speed: ${data.wind.speed} mph</p>
      `)
      $(".city-data").append(currentForcast);
      $(".main-search-results").addClass("border border-dark")

     
  
      var cityLongitude = data.coord.lon
      var cityLatitude = data.coord.lat 
      

      fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
          console.log(data, "here")

          var fiveDayForecast = data.list.filter(day => day.dt_txt.includes("12:00:00"))
            for (let i = 0; i < fiveDayForecast.length; i++) {
              var icon = fiveDayForecast[i].weather[0].icon
              var iconImage = "https://openweathermap.org/img/wn/" + icon + ".png"
              var currentDate = new Date(fiveDayForecast[i].dt_txt).toLocaleString().split(",")[0]
              var fiveDayCard = $(`
              <div class= "pl-3">
              <div class= "card pl-3 pt-3 mb-3 bg-primary text-light" style= "width: 11rem">
              <div class= "card-body">
              <p>${currentDate}</p>
              <p><img src="${iconImage}"/></p>
              <p>Temp: ${fiveDayForecast[i].main.temp} °F</p>
              <p>Wind: ${fiveDayForecast[i].wind.speed} mph</p>
              <p>Humidity: ${fiveDayForecast[i].main.humidity}%</p>
              </div>
              </div>
              </div>
              
              `)
              $(".five-day").append(fiveDayCard)
              
            }
            $(".title-five-day").append("5-Day Forecast:")
        })
    })
savingSearch()
}

$(".history").on("click", function(event) {
  var pastCity = event.target.getAttribute("id")
  console.log(pastCity)
  searchSavedCity(pastCity)
})