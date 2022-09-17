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
