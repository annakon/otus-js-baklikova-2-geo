const T0 = 273.15;

export async function returnResponseOpenweathermap(city) {
  if (city === "") {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const json = await response.json();

    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${json.latitude}&lon=${json.longitude}&appid=2dd5152e26591562500eba5a006f9a67`
    );
  }

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2dd5152e26591562500eba5a006f9a67`
  );
}

export async function drawWeather(el, city) {
  const responseOpenweathermap = await returnResponseOpenweathermap(city);
  const jsonOpenweathermap = await responseOpenweathermap.json();

  const temp = (jsonOpenweathermap.main.temp - T0).toFixed(0);

  el.innerHTML = `<h1>${jsonOpenweathermap.name}</h1><p>${temp}&deg;</p>
                   <img alt="icon" src="http://openweathermap.org/img/wn/${jsonOpenweathermap.weather[0].icon}@2x.png">`;

  document.getElementById("map").innerHTML = "";

  ymaps.ready(initMap);
  function initMap() {
    // Создание карты.
    const myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [jsonOpenweathermap.coord.lat, jsonOpenweathermap.coord.lon],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 7,
    });
  }
}
