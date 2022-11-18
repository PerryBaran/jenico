import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Volume from "../../components/player/volume/Volume";

describe("Volume", () => {
  const validProps = {
    volume: 0.5,
    handleVolume: jest.fn(),
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <Volume
        volume={validProps.volume}
        handleVolume={validProps.handleVolume}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders correctly, volume >= 0.5", () => {
    render(
      <Volume
        volume={validProps.volume}
        handleVolume={validProps.handleVolume}
      />
    );
    const input = screen.getByTestId("volume");

    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("value", `${validProps.volume * 100}`);
    expect(screen.getByAltText("volume")).toHaveAttribute(
      "src",
      "medium-volume.png"
    );
  });

  test("renders correctly, 0 < volume < 0.5", () => {
    const volume = 0.3;
    render(<Volume volume={volume} handleVolume={validProps.handleVolume} />);

    expect(screen.getByTestId("volume")).toHaveAttribute(
      "value",
      `${volume * 100}`
    );
    expect(screen.getByAltText("volume")).toHaveAttribute(
      "src",
      "low-volume.png"
    );
  });

  test("renders correctly, volume = 0", () => {
    const volume = 0;
    render(<Volume volume={volume} handleVolume={validProps.handleVolume} />);

    expect(screen.getByTestId("volume")).toHaveAttribute(
      "value",
      `${volume * 100}`
    );
    expect(screen.getByAltText("volume")).toHaveAttribute(
      "src",
      "volume-mute.png"
    );
  });

  test("input", () => {
    render(
      <Volume
        volume={validProps.volume}
        handleVolume={validProps.handleVolume}
      />
    );
    const newVolume = "0.7";

    expect(validProps.handleVolume).toBeCalledTimes(0);
    fireEvent.change(screen.getByTestId("volume"), {
      target: { value: newVolume },
    });
    expect(validProps.handleVolume).toBeCalledTimes(1);
    expect(validProps.handleVolume).toBeCalledWith(Number(newVolume) / 100);
  });
});
