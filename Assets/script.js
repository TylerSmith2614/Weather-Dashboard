var rootURL = "https://api.openweathermap.org";
// change out api with the one i receive in my email
var apiKey = 'df3fb9934a7d8ebae97c6749b588071a';
var dayOfTheWeek = dayjs().format("dddd");

function search(city) {
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
      <p>Temperature: ${data.main.temp} degrees</p>
      <p>Humidity: ${data.main.humidity} </p>
      <p>Wind speed: ${data.wind.speed} mph</p>
      `)
      $(".city-data").append(currentForcast);
      var cityLongitude = data.coord.lon
      var cityLatitude = data.coord.lat 

      fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
          console.log(data, "here")
          $("#five-day").empty()
          var fiveDayForecast = data.list.filter(day => day.dt_txt.includes("12:00:00"))
            for (let i = 0; i < fiveDayForecast.length; i++) {
              var icon = fiveDayForecast[i].weather[0].icon
              var iconImage = "https://openweathermap.org/img/wn/" + icon + ".png"
              var currentDate = new Date(fiveDayForecast[i].dt_txt).toLocaleString().split(",")[0]
              var fiveDayCard = $(`
              <div class= "pl-3">
              <div class= "card pl-3 pt-3 mb-3 bg-primary text-light" style= "width: 12rem">
              <div class= "card-body">
              <p><img src="${iconImage}"/></p>
              <p>${currentDate}</p>
              <p>${fiveDayForecast[i].main.temp}</p>
              <p>${fiveDayForecast[i].main.humidity}</p>
               <p>${fiveDayForecast[i].wind.speed}</p>
              </div>
              </div>
              </div>
              
              `)
              $(".five-day").append(fiveDayCard)
            }
        })
    })
}

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // .trim takes out the white spaces like if you add a space when searching
    var city = $("#search").val().trim();
    search(city)
    $("#search").val("")
})


// create a function for saving the search in local storage.  Create buttons that append from local storage. Each button represents the city searched.
