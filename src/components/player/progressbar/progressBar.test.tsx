import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressBar from "./ProgresssBar";
import { useRef } from "react";

afterEach(cleanup);

const RenderWithProps = ({ time = 0, duration = 0 }) => {
  const ref = useRef(null);
  return <ProgressBar audioRef={ref} time={time} duration={duration} />;
};

it("renders without crashing", () => {
  render(<RenderWithProps />);
});

describe("slider", () => {
  it("is rendered", () => {
    render(<RenderWithProps />);
    const bar = screen.getByRole("slider");
    expect(bar).toBeTruthy();
  });
  it("has correct name", () => {
    render(<RenderWithProps />);
    const bar = screen.getByRole("slider");
    expect(bar).toHaveAttribute("name", "time");
  });
  it("initializes correctly", () => {
    render(<RenderWithProps />);
    const bar = screen.getByRole("slider");
    expect(bar).toHaveAttribute("min", "0");
    expect(bar).toHaveValue("0");
  });
  it("updates with props", () => {
    render(<RenderWithProps time={20} duration={25} />);
    const bar = screen.getByRole("slider");
    expect(bar).toHaveAttribute("max", "25");
    expect(bar).toHaveValue("20");
  });
});
