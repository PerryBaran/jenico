import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaControls from "../../components/player/mediaControls/MediaControls";

describe("MediaControls", () => {
  const validProps = {
    playing: true,
    handlePlaying: jest.fn(),
    skipSong: jest.fn(),
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <MediaControls
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        skipSong={validProps.skipSong}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("content, playing === true", () => {
    render(
      <MediaControls
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        skipSong={validProps.skipSong}
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByAltText("skip backward")).toHaveAttribute(
      "src",
      "skip.png"
    );
    expect(screen.getByAltText("play/pause")).toHaveAttribute(
      "src",
      "pause.png"
    );
    expect(screen.getByAltText("skip forward")).toHaveAttribute(
      "src",
      "skip.png"
    );
  });

  test("content, playing === false", () => {
    render(
      <MediaControls
        playing={false}
        handlePlaying={validProps.handlePlaying}
        skipSong={validProps.skipSong}
      />
    );

    expect(screen.getByAltText("play/pause")).toHaveAttribute(
      "src",
      "play.png"
    );
  });

  test("buttons", () => {
    render(
      <MediaControls
        playing={false}
        handlePlaying={validProps.handlePlaying}
        skipSong={validProps.skipSong}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(validProps.skipSong).toBeCalledTimes(0);
    expect(validProps.handlePlaying).toBeCalledTimes(0);
    buttons[0].click();
    expect(validProps.skipSong).lastCalledWith(false);
    buttons[1].click();
    expect(validProps.handlePlaying).lastCalledWith();
    buttons[2].click();
    expect(validProps.skipSong).lastCalledWith();
    expect(validProps.skipSong).toBeCalledTimes(2);
    expect(validProps.handlePlaying).toBeCalledTimes(1);
  });
});
