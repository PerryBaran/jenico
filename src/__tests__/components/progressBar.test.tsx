import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgresssBar from "../../components/player/progressbar/ProgresssBar";

describe("ProgressBar", () => {
  const validProps: any = {
    time: 20,
    duration: 300,
    handleAudioTime: jest.fn(),
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <ProgresssBar
        handleAudioTime={validProps.handleAudioTime}
        time={validProps.time}
        duration={validProps.duration}
      />
    );

    expect(asFragment).toMatchSnapshot();
  });

  test("content", () => {
    render(
      <ProgresssBar
        handleAudioTime={validProps.handleAudioTime}
        time={validProps.time}
        duration={validProps.duration}
      />
    );
    const input = screen.getByTestId("progress-bar");
    
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveAttribute("name", "time");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", validProps.duration.toString());
    expect(input).toHaveAttribute("value", validProps.time.toString());
  });

  test("input change", () => {
    render(
      <ProgresssBar
        handleAudioTime={validProps.handleAudioTime}
        time={validProps.time}
        duration={validProps.duration}
      />
    );
    const input = screen.getByTestId("progress-bar");
    const newValue = "40";

    expect(validProps.handleAudioTime).toBeCalledTimes(0);
    fireEvent.change(input, { target: { value: newValue } });
    expect(validProps.handleAudioTime).toBeCalledWith(Number(newValue));
  });
});