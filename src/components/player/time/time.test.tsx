import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Time from "./Time";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Time time={20} />);
});

it("renders correct time value", () => {
  render(<Time time={126} />);
  const text = screen.getByText("2:06");
  expect(text).toBeTruthy();
});
