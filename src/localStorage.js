// Должна возвращать список пользователя
// Если пользователь ничего не вводил - пустой список
export async function readList() {
  const a = localStorage.getItem("list");
  if (a === null) {
    return [];
  }
  return JSON.parse(a, []);
}

// Сохраняет список
export function saveList(items) {
  localStorage.setItem("list", JSON.stringify(items));
}

export function drawList(el, items) {
  el.innerHTML = `${items.map((el) => `<option>${el}</option>`).join("")}`;
}
