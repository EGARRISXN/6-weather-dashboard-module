$(document).ready(function () {
  let localStorageData = new Set(JSON.parse(localStorage.getItem("city")) || []);
  const apiKey = "e081906e41053d0045aef1f5836faf73";
  const historyContainer = $("#search-history");
  const mainWeatherContainer = $("<div>").attr("id", "mainWeather");

  function showHistory() {
    historyContainer.empty();
    localStorageData.forEach((data) => {
      const button = $("<button>")
        .addClass("btn-history btn text-black btn-secondary font-weight-bold mb-2 mt-2")
        .text(data)
        .attr("data-city", data)
        .on("click", function (event) {
          event.preventDefault();
          getApiData(data);
        });
      historyContainer.append(button);
    });
  }

  function getApiData(city) {
    const forecastData = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${apiKey}&units=imperial`;
    fetch(forecastData)
      .then(response => response.json())
      .then(data => {
        localStorageData.add(data.city.name);
        localStorage.setItem("city", JSON.stringify(Array.from(localStorageData)));
        showHistory();
        loadMainWeather(data);
      })
      .catch(error => {
        console.log(error);
        alert("An error occurred while fetching weather data.");
      });
  }

  function loadMainWeather(data) {
    const now = dayjs().format(" (M/DD/YYYY)");
    const mainName = $("<div>").attr("id", "main-name").text(data.city.name + now);
    const mainTemp = $("<div>").attr("id", "main-temp").text("temp: " + data.list[0].temp.day);
    const mainWind = $("<div>").attr("id", "main-wind").text("wind: " + data.list[0].speed);
    const mainHumidity = $("<div>").attr("id", "main-humidity").text("humidity: " + data.list[0].humidity + "%");
    mainWeatherContainer.empty().append(mainName, mainTemp, mainWind, mainHumidity);
    $("#mainWeather").html(mainWeatherContainer);
  }

  showHistory();
  getApiData("city");

  $(".btn").on("click", function (event) {
    event.preventDefault();
    const searchCity = $("#city").val();
    $("#city").val("");
    getApiData(searchCity);
  });
});
