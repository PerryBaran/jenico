import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Player from "../../components/player/Player";
import mockData from "../../media/songInfo";

const ALBUM_INDEX = 1;

describe("Player", () => {
  const validProps = {
    data: mockData,
    playing: true,
    handlePlaying: jest.fn(),
    selectedSong: mockData[ALBUM_INDEX].songs[0].name,
    handleSelectedSong: jest.fn(),
    formFocused: true,
  };

  jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(jest.fn());
  jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(jest.fn());

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <Player
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong={validProps.selectedSong}
        handleSelectedSong={validProps.handleSelectedSong}
        formFocused={validProps.formFocused}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("handleVolume", () => {
    render(
      <Player
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong={validProps.selectedSong}
        handleSelectedSong={validProps.handleSelectedSong}
        formFocused={validProps.formFocused}
      />
    );
    const input = screen.getByTestId("volume");

    expect(input).toHaveAttribute("value", "50");
    fireEvent.change(input, { target: { value: "200" } });
    expect(input).toHaveAttribute("value", "100");
    fireEvent.change(input, { target: { value: "-200" } });
    expect(input).toHaveAttribute("value", "0");
    fireEvent.change(input, { target: { value: "40" } });
    expect(input).toHaveAttribute("value", "40");
  });

  describe("skipSong", () => {
    describe("forwards", () => {
      test("nextSongIndex < albumLength", () => {
        const selectedSong = validProps.data[1].songs[0].name;
        render(
          <Player
            data={validProps.data}
            playing={validProps.playing}
            handlePlaying={validProps.handlePlaying}
            selectedSong={selectedSong}
            handleSelectedSong={validProps.handleSelectedSong}
            formFocused={validProps.formFocused}
          />
        );

        expect(validProps.handleSelectedSong).toBeCalledTimes(0);
        fireEvent.click(screen.getByAltText("skip forward"));
        expect(validProps.handleSelectedSong).toBeCalledTimes(1);
        expect(validProps.handleSelectedSong).toBeCalledWith(
          validProps.data[1].songs[1].name
        );
      });

      test("nextSongIndex > albumLength but nextAlbumIndex < playlistLength", () => {
        const selectedSong =
          validProps.data[1].songs[validProps.data[1].songs.length - 1].name;
        render(
          <Player
            data={validProps.data}
            playing={validProps.playing}
            handlePlaying={validProps.handlePlaying}
            selectedSong={selectedSong}
            handleSelectedSong={validProps.handleSelectedSong}
            formFocused={validProps.formFocused}
          />
        );

        expect(validProps.handleSelectedSong).toBeCalledTimes(0);
        fireEvent.click(screen.getByAltText("skip forward"));
        expect(validProps.handleSelectedSong).toBeCalledTimes(1);
        expect(validProps.handleSelectedSong).toBeCalledWith(
          validProps.data[2].songs[0].name
        );
      });

      test("nextSongIndex > albumLength and nextAlbumIndex > playlistLength", () => {
        const selectedSong =
          validProps.data[validProps.data.length - 1].songs[
            validProps.data[validProps.data.length - 1].songs.length - 1
          ].name;
        render(
          <Player
            data={validProps.data}
            playing={validProps.playing}
            handlePlaying={validProps.handlePlaying}
            selectedSong={selectedSong}
            handleSelectedSong={validProps.handleSelectedSong}
            formFocused={validProps.formFocused}
          />
        );

        expect(validProps.handleSelectedSong).toBeCalledTimes(0);
        fireEvent.click(screen.getByAltText("skip forward"));
        expect(validProps.handleSelectedSong).toBeCalledTimes(1);
        expect(validProps.handleSelectedSong).toBeCalledWith(
          validProps.data[0].songs[0].name
        );
      });
    });

    describe("backwards", () => {
      test("prevSongIndex >= 0", () => {
        const selectedSong = validProps.data[1].songs[1].name;
        render(
          <Player
            data={validProps.data}
            playing={validProps.playing}
            handlePlaying={validProps.handlePlaying}
            selectedSong={selectedSong}
            handleSelectedSong={validProps.handleSelectedSong}
            formFocused={validProps.formFocused}
          />
        );

        expect(validProps.handleSelectedSong).toBeCalledTimes(0);
        fireEvent.click(screen.getByAltText("skip backward"));
        expect(validProps.handleSelectedSong).toBeCalledTimes(1);
        expect(validProps.handleSelectedSong).toBeCalledWith(
          validProps.data[1].songs[0].name
        );
      });

      test("prevSongIndex < 0 but prevAlbumIndex >= 0", () => {
        const selectedSong = validProps.data[1].songs[0].name;
        render(
          <Player
            data={validProps.data}
            playing={validProps.playing}
            handlePlaying={validProps.handlePlaying}
            selectedSong={selectedSong}
            handleSelectedSong={validProps.handleSelectedSong}
            formFocused={validProps.formFocused}
          />
        );

        expect(validProps.handleSelectedSong).toBeCalledTimes(0);
        fireEvent.click(screen.getByAltText("skip backward"));
        expect(validProps.handleSelectedSong).toBeCalledTimes(1);
        expect(validProps.handleSelectedSong).toBeCalledWith(
          validProps.data[0].songs[validProps.data[0].songs.length - 1].name
        );
      });

      test("prevSongIndex < 0 and prevAlbumIndex < 0", () => {
        const selectedSong = validProps.data[0].songs[0].name;
        render(
          <Player
            data={validProps.data}
            playing={validProps.playing}
            handlePlaying={validProps.handlePlaying}
            selectedSong={selectedSong}
            handleSelectedSong={validProps.handleSelectedSong}
            formFocused={validProps.formFocused}
          />
        );

        expect(validProps.handleSelectedSong).toBeCalledTimes(0);
        fireEvent.click(screen.getByAltText("skip backward"));
        expect(validProps.handleSelectedSong).toBeCalledTimes(1);
        expect(validProps.handleSelectedSong).toBeCalledWith(
          validProps.data[validProps.data.length - 1].songs[
            validProps.data[validProps.data.length - 1].songs.length - 1
          ].name
        );
      });
    });
  });

  describe("keyDownHandler", () => {
    test("formFocus = true", () => {
      render(
        <Player
          data={validProps.data}
          playing={validProps.playing}
          handlePlaying={validProps.handlePlaying}
          selectedSong={validProps.selectedSong}
          handleSelectedSong={validProps.handleSelectedSong}
          formFocused={true}
        />
      );

      expect(validProps.handlePlaying).toBeCalledTimes(0);
      fireEvent.keyDown(window, { code: "Space", charCode: 32 });
      expect(validProps.handlePlaying).toBeCalledTimes(0);
    });

    test("formFocus = false", () => {
      render(
        <Player
          data={validProps.data}
          playing={validProps.playing}
          handlePlaying={validProps.handlePlaying}
          selectedSong={validProps.selectedSong}
          handleSelectedSong={validProps.handleSelectedSong}
          formFocused={false}
        />
      );
      const input = screen.getByTestId("volume");
      const initialVolume = "50";

      expect(validProps.handlePlaying).toBeCalledTimes(0);
      fireEvent.keyDown(window, { code: "Space", charCode: 32 });
      expect(validProps.handlePlaying).toBeCalledTimes(1);
      expect(validProps.handlePlaying).toBeCalledWith();
      expect(validProps.handleSelectedSong).toBeCalledTimes(0);
      fireEvent.keyDown(window, { code: "ArrowLeft", charCode: 37 });
      expect(validProps.handleSelectedSong).toBeCalledTimes(1);
      expect(validProps.handleSelectedSong).lastCalledWith(
        mockData[ALBUM_INDEX - 1].songs[
          mockData[ALBUM_INDEX - 1].songs.length - 1
        ].name
      );
      fireEvent.keyDown(window, { code: "ArrowRight", charCode: 39 });
      expect(validProps.handleSelectedSong).toBeCalledTimes(2);
      expect(validProps.handleSelectedSong).lastCalledWith(
        mockData[ALBUM_INDEX].songs[1].name
      );
      fireEvent.change(input, { target: { value: initialVolume } });
      expect(input).toHaveAttribute("value", initialVolume);
      fireEvent.keyDown(window, { code: "ArrowUp", charCode: 38 });
      expect(input).toHaveAttribute("value", `${Number(initialVolume) + 1}`);
      fireEvent.keyDown(window, { code: "Equal", charCode: 187 });
      expect(input).toHaveAttribute("value", `${Number(initialVolume) + 2}`);
      fireEvent.keyDown(window, { code: "NumpadAdd", charCode: 107 });
      expect(input).toHaveAttribute("value", `${Number(initialVolume) + 3}`);
      fireEvent.keyDown(window, { code: "ArrowDown", charCode: 40 });
      expect(input).toHaveAttribute("value", `${Number(initialVolume) + 2}`);
      fireEvent.keyDown(window, { code: "Minus", charCode: 189 });
      expect(input).toHaveAttribute("value", `${Number(initialVolume) + 1}`);
      fireEvent.keyDown(window, { code: "NumpadSubtract", charCode: 109 });
      expect(input).toHaveAttribute("value", initialVolume);
    });
  });
});
