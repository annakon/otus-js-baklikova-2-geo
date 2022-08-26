import "../css/styles.css";

const dataWeather = {
  coord: {
    lon: 37.62,
    lat: 55.75,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 2.15,
    feels_like: -3.03,
    temp_min: 2,
    temp_max: 2.22,
    pressure: 1029,
    humidity: 69,
  },
  visibility: 10000,
  wind: {
    speed: 4,
    deg: 310,
  },
  clouds: {
    all: 75,
  },
  dt: 1605098072,
  sys: {
    type: 1,
    id: 9029,
    country: "RU",
    sunrise: 1605070630,
    sunset: 1605101407,
  },
  timezone: 10800,
  id: 524901,
  name: "Moscow",
  cod: 200,
};

/**
 * Функция должна отображать в элементе следующие данные
 * - имя города
 * - текущую температуру (main.temp)
 * - иконку для погоды (одну или все - weather[index]icon)
 *   (см https://openweathermap.org/weather-conditions#How-to-get-icon-URL)
 *   например http://openweathermap.org/img/wn/10d@2x.png
 *
 * Разметка любая
 */
async function drawWeather(el, data) {
  const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const json = await response.json();
  el.innerHTML = `<h1>${json.region}</h1><p>${data.main.temp}</p>
                   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
}

drawWeather(document.querySelector("#container"), dataWeather);
