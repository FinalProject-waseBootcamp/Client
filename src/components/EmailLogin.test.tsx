import { Container, render, unmountComponentAtNode } from "react-dom";
import EmailLogin from "./logIn/EmailLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("<EmailLogin />", () => {
  let container: HTMLElement;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });
  test("Should render card correctly with details", () => {
    const business = {};

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EmailLogin />} />
        </Routes>
      </BrowserRouter>,
      container
    );
    expect(container.textContent).toContain(business);
  });
});
