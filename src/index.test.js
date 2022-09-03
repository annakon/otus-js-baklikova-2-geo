/**
 * @jest-environment jsdom
 */

import * as fs from "fs";

import init from "./index";

describe("init", () => {
  document.body.innerHTML = fs.readFileSync(`${__dirname  }/../index.html`);

  let button;
  let input;
  let h1;
  let p;

  beforeEach(() => init());

  function getParagraphs() {
    return [...document.querySelectorAll("p")].map((p) => p.innerHTML);
  }

  /* it("is a function", () => {
        expect(makeInteractiveList).toBeInstanceOf(Function);
    }); */

  it("makes initial markup", () => {
    button = document.querySelector("button");
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
    /* expect(el.querySelectorAll("p").length).toBe(3);
        expect(getParagraphs()).toEqual(["1", "22", "333"]); */
  });
});
