import { Container, render, unmountComponentAtNode } from "react-dom";
import Header from "./Header";
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

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </BrowserRouter>,
      container
    );
    expect(container.textContent).toContain("Build your system");
  });
});











// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
