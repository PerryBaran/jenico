import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import reactRouterDom from "react-router-dom";
import "@testing-library/jest-dom";
import Album from "../../components/routes/album/Album";
import mockData from "../../media/songInfo";

const ALBUM_INDEX = 1;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Album", () => {
  const validProps = {
    data: mockData,
    playing: false,
    handlePlaying: jest.fn(),
    selectedSong: mockData[ALBUM_INDEX].songs[0].name,
    handleSelectSong: jest.fn(),
  };

  afterEach(cleanup);

  beforeEach(() => {
    jest
      .spyOn(reactRouterDom, "useParams")
      .mockReturnValue({ album: validProps.data[ALBUM_INDEX].title });
  });

  test("snapshot", () => {
    const { asFragment } = render(
      <Album
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong={validProps.selectedSong}
        handleSelectSong={validProps.handleSelectSong}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(
      <Album
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong={validProps.selectedSong}
        handleSelectSong={validProps.handleSelectSong}
      />
    );
    const album = validProps.data[ALBUM_INDEX];

    expect(screen.getByText(album.title)).toHaveAttribute(
      "href",
      album.hyperlink
    );
    expect(screen.getByAltText(`Cover for ${album.title}`)).toHaveAttribute(
      "src",
      album.art
    );
    expect(screen.getByAltText("play/pause album")).toBeInstanceOf(
      HTMLImageElement
    );
    album.songs.forEach((song) => {
      expect(screen.getByText(song.name)).toBeInstanceOf(HTMLButtonElement);
    });
  });

  test("play album with selected Song not in album", () => {
    render(
      <Album
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong=""
        handleSelectSong={validProps.handleSelectSong}
      />
    );
    const playPause = screen.getByAltText("play/pause album");

    expect(validProps.handlePlaying).toBeCalledTimes(0);
    expect(validProps.handleSelectSong).toBeCalledTimes(0);
    fireEvent.click(playPause);
    expect(validProps.handlePlaying).lastCalledWith(true);
    expect(validProps.handleSelectSong).toBeCalledWith(
      validProps.data[ALBUM_INDEX].songs[0].name
    );
  });

  test("play album with selected Song in album", () => {
    render(
      <Album
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong={validProps.selectedSong}
        handleSelectSong={validProps.handleSelectSong}
      />
    );
    const playPause = screen.getByAltText("play/pause album");

    expect(validProps.handlePlaying).toBeCalledTimes(0);
    expect(validProps.handleSelectSong).toBeCalledTimes(0);
    fireEvent.click(playPause);
    expect(validProps.handlePlaying).toBeCalledTimes(1);
    expect(validProps.handleSelectSong).toBeCalledTimes(0);
  });

  test("play song from album", () => {
    render(
      <Album
        data={validProps.data}
        playing={validProps.playing}
        handlePlaying={validProps.handlePlaying}
        selectedSong={validProps.selectedSong}
        handleSelectSong={validProps.handleSelectSong}
      />
    );
    const songName = validProps.data[ALBUM_INDEX].songs[1].name;
    const song = screen.getByText(songName);

    expect(validProps.handlePlaying).toBeCalledTimes(0);
    expect(validProps.handleSelectSong).toBeCalledTimes(0);
    fireEvent.click(song);
    expect(validProps.handlePlaying).toBeCalledWith(true);
    expect(validProps.handleSelectSong).toBeCalledWith(songName);
  });
});
