import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Socials from "./Socials";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Socials href="" imgSrc="" name="" />);
});

it("renders p element correctly", () => {
  render(<Socials href="" imgSrc="" name="name" />);
  const p = screen.getByText("name");
  expect(p).toBeTruthy();
});

it("renders img correctly", () => {
  render(<Socials href="" imgSrc="img" name="name" />);
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "img");
  expect(img).toHaveAttribute("alt", "name icon");
});

it("renders a element correctly", () => {
  render(<Socials href="src" imgSrc="" name="" />);
  const a = screen.getByRole("link");
  expect(a).toHaveAttribute("href", "src");
});
