/**
 * @jest-environment jsdom
 */

import * as fs from "fs";

import init from "./index";

describe("init", () => {
  let button;
  let input;
  let h1;
  let p;

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync(`${__dirname}/../index.html`);
    return init();
  });

  /* function getParagraphs() {
    return [...document.querySelectorAll("option")].map((op) => op.innerHTML);
  } */

  it("makes initial markup", () => {
    button = document.querySelector("#Find");
    input = document.querySelector("input");
    h1 = document.querySelector("h1");
    p = document.querySelector("p");

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe("Find");

    expect(h1).toBeTruthy();
    expect(h1.innerHTML).toBeTruthy();
    expect(p).toBeTruthy();
    expect(p.innerHTML).toBeTruthy();
    const img = document.querySelector("img");
    expect(img).toBeTruthy();
    const map = document.querySelector("#map");
    expect(map).toBeTruthy();
  });

  it("adds new paragraph on button click", () => {
    // ввести текст
    button = document.querySelector("#Find");
    input = document.querySelector("input");
    input.value = "Singapore";
    input.dispatchEvent(new Event("input"));
    // нажать кнопку
    button.click();
    // проверить что добавился параграф
    expect(input.innerHTML).toEqual("");
  });
});
