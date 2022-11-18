import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Time from "../../components/player/time/Time";

describe("Time", () => {
  const validProps = {
    time: 20
  };

  test("snapshot", () => {
    const { asFragment } = render(<Time time={validProps.time} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("correctly renders time", () => {
    test("time === 0", () => {
      render(<Time time={0} />);

      expect(screen.getByText("0:00")).toBeInTheDocument();
    });

    test("time === 30", () => {
      render(<Time time={30} />);

      expect(screen.getByText("0:30")).toBeInTheDocument();
    });

    test("time === 60", () => {
      render(<Time time={60} />);

      expect(screen.getByText("1:00")).toBeInTheDocument();
    });

    test("time === 600", () => {
      render(<Time time={600} />);

      expect(screen.getByText("10:00")).toBeInTheDocument();
    });
  });
});