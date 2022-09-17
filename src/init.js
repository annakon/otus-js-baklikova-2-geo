import { readList, saveList } from "./localStorage";
import { returnResponseOpenweathermap } from "./api";

const T0 = 273.15;
let items;

async function drawWeather(el, city) {
  const responseOpenweathermap = await returnResponseOpenweathermap(city);
  const jsonOpenweathermap = await responseOpenweathermap.json();

  if (jsonOpenweathermap.cod !== 200) {
    alert(jsonOpenweathermap.message);
    return;
  }

  const temp = (jsonOpenweathermap.main.temp - T0).toFixed(0);

  el.innerHTML = `<h1>${jsonOpenweathermap.name}</h1><div id="plusButton"></div><p>${temp}&deg;</p>
                   <img alt="icon" src="http://openweathermap.org/img/wn/${jsonOpenweathermap.weather[0].icon}@2x.png">`;

  const listEl = document.querySelector("#recentResults");
  const buttonList = document.querySelector("#plusButton");

  if (city === "") {
    // Читаем список при старте
    items = await readList();
  }
  const value = city === "" ? jsonOpenweathermap.name : city;
  // добавляем элемент в список
  if (!items.includes(value)) items.push(value);
  if (items.length > 10) items.shift();
  // обновляем список
  drawList(buttonList, listEl, items);
  // сохраняем список
  saveList(items);

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

function drawList(butEl, el, items) {
  el.innerHTML = `${items.map((el) => `<option>${el}</option>`).join("")}`;
  let but;
  for (let i = 0; i < items.length; i += 1) {
    but = document.createElement("button");
    but.innerHTML = items[i];
    but.addEventListener("click", () => {
      drawWeather(document.querySelector("#container"), items[i]);
    });
    butEl.appendChild(but);
  }
}

function onCityClick(ev) {
  // чтобы не перезагружать страницу
  ev.preventDefault();

  // читаем значение из формы
  const formElement = ev.target;
  const input = formElement.querySelector("input");
  const { value } = input;
  input.value = "";

  drawWeather(document.querySelector("#container"), value);
}

export async function init() {
  const form = document.querySelector("form");
  form.addEventListener("submit", onCityClick);

  return drawWeather(document.querySelector("#container"), "");
}
