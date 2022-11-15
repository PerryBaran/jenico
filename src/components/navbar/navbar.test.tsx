import { render, screen, cleanup } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

afterEach(cleanup);

it("renders without crashing", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
});

it("rendes h1 with correct text", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
  const h1 = screen.getByRole("heading");
  expect(h1).toHaveTextContent("Jenico");
});

it("renders buttons with correct text", () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).toHaveTextContent("Home");
  expect(buttons[1]).toHaveTextContent("Music");
  expect(buttons[2]).toHaveTextContent("Contact");
});

//struggling to work out how to test links
