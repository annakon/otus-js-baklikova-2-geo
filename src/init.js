import { readList, saveList, drawList } from "./localStorage";
import { drawWeather } from "./api";

export async function init() {
  // Получаем указатели на нужные элементы
  const form = document.querySelector("form");
  const listEl = document.querySelector("#recentResults");

  // Читаем список при старте
  const items = await readList();

  // и отрисовываем список
  drawList(listEl, items);

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

  return drawWeather(document.querySelector("#container"), "");
}
