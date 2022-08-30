import "../css/styles.css";

(async function () {
  // Должна возвращать список пользователя
  // Если пользователь ничего не вводил - пустой список
  async function readList() {
    const a = localStorage.getItem("list");
    if (a === null) {
      return [];
    }
    return JSON.parse(a, []);
  }

  // Сохраняет список
  function saveList(items) {
    // let unique = [...new Set(items)];
    localStorage.setItem("list", JSON.stringify(items));
  }

  function drawList(el, items) {
    el.innerHTML = `${items.map((el) => `<option>${el}</option>`).join("")}`;
  }

  async function returnResponseOpenweathermap(city) {
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

  async function drawWeather(el, city) {
    const responseOpenweathermap = await returnResponseOpenweathermap(city);
    const jsonOpenweathermap = await responseOpenweathermap.json();

    const temp = (jsonOpenweathermap.main.temp - 273.15).toFixed(0);

    el.innerHTML = `<h1>${jsonOpenweathermap.name}</h1><p>${temp}&deg;</p>
                   <img alt="icon" src="http://openweathermap.org/img/wn/${jsonOpenweathermap.weather[0].icon}@2x.png">`;
  }

  // Получаем указатели на нужные элементы
  const form = document.querySelector("form");
  const listEl = document.querySelector("#recentResults");

  // Читаем список при старте
  const items = await readList();

  // и отрисовываем список
  drawList(listEl, items);

  drawWeather(document.querySelector("#container"), "");

  ymaps.ready(init);
  function init() {
    // Создание карты.
    const myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76, 37.64],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 7,
    });
  }

  form.addEventListener("submit", (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const input = formElement.querySelector("input");
    const { value } = input;
    input.value = "";

    // добавляем элемент в список
    if (!items.includes(value)) items.push(value);
    if (items.length > 10) items.shift();

    // обновляем список
    drawList(listEl, items);

    // сохраняем список
    saveList(items);
    drawWeather(document.querySelector("#container"), value);
  });
})();
