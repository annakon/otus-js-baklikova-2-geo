import "../css/styles.css";

async function drawWeather(el) {
  const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const json = await response.json();

  const responseOpenweathermap = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${json.latitude}&lon=${json.longitude}&appid=2dd5152e26591562500eba5a006f9a67`
  );
  const jsonOpenweathermap = await responseOpenweathermap.json();

  const temp = (jsonOpenweathermap.main.temp - 273.15).toFixed(0);

  el.innerHTML = `<h1>${json.region}</h1><p>${temp}&deg;</p>
                   <img alt="icon" src="http://openweathermap.org/img/wn/${jsonOpenweathermap.weather[0].icon}@2x.png">`;
}

drawWeather(document.querySelector("#container"));
