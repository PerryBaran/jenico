import { RefObject } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Audio from "../../components/player/audio/Audio";

describe("Audio", () => {
  const validProps = {
    audioRef: {
      current: {
        play: jest.fn(),
        pause: jest.fn(),
      },
    } as unknown as RefObject<HTMLAudioElement>,
    playing: true,
    source: "string",
    setDuration: jest.fn(),
    skipSong: jest.fn(),
  };

  afterEach(cleanup);

  jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(validProps.audioRef.current?.play);
  jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(validProps.audioRef.current?.pause);

  test("snapshot", () => {
    const { asFragment } = render(
      <Audio
        audioRef={validProps.audioRef}
        playing={validProps.playing}
        source={validProps.source}
        setDuration={validProps.setDuration}
        skipSong={validProps.skipSong}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(
      <Audio
        audioRef={validProps.audioRef}
        playing={validProps.playing}
        source={validProps.source}
        setDuration={validProps.setDuration}
        skipSong={validProps.skipSong}
      />
    );

    expect(screen.getByTestId("audio")).toHaveAttribute(
      "src",
      validProps.source
    );
  });

  test("plays audio if playing prop is true", () => {
    render(
      <Audio
        audioRef={validProps.audioRef}
        playing={validProps.playing}
        source={validProps.source}
        setDuration={validProps.setDuration}
        skipSong={validProps.skipSong}
      />
    );

    expect(validProps.audioRef.current?.play).toHaveBeenCalled();
  });

  test("pauses audio if playing prop is false", () => {
    render(
      <Audio
        audioRef={validProps.audioRef}
        playing={false}
        source={validProps.source}
        setDuration={validProps.setDuration}
        skipSong={validProps.skipSong}
      />
    );

    expect(validProps.audioRef.current?.pause).toHaveBeenCalled();
  });

  // setDuration and skipSong require valid audio source to test
});
