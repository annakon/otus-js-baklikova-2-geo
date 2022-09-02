import { init } from "./index";

describe("init", () => {
  let button;
  let input;
  let h1;
  let p;
  // let el;
  beforeEach(() => {
    // el = document.createElement("div");
    init();
    button = document.querySelector("button");
    input = document.querySelector("input");
    h1 = document.querySelector("h1");
    p = document.querySelector("p");
  });

  function getParagraphs() {
    return [...document.querySelectorAll("p")].map((p) => p.innerHTML);
  }

  /* it("is a function", () => {
        expect(makeInteractiveList).toBeInstanceOf(Function);
    }); */

  it("makes initial markup", () => {
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
