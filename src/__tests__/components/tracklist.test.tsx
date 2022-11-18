import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tracklist from "../../components/player/tracklist/Tracklist";
import mockData from "../../media/songInfo";

const ALBUM_INDEX = 1;

describe("Tracklist", () => {
  const validProps = {
    data: mockData,
    selectedSong: mockData[ALBUM_INDEX].songs[0].name,
    selectedAlbum: mockData[ALBUM_INDEX],
    handleSelectedSong: jest.fn(),
    handlePlaying: jest.fn(),
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <Tracklist
        data={validProps.data}
        selectedSong={validProps.selectedSong}
        selectedAlbum={validProps.selectedAlbum}
        handleSelectedSong={validProps.handleSelectedSong}
        handlePlaying={validProps.handlePlaying}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(
      <Tracklist
        data={validProps.data}
        selectedSong={validProps.selectedSong}
        selectedAlbum={validProps.selectedAlbum}
        handleSelectedSong={validProps.handleSelectedSong}
        handlePlaying={validProps.handlePlaying}
      />
    );

    expect(
      screen.getByAltText(`${validProps.selectedAlbum.title} cover art`)
    ).toHaveAttribute("src", validProps.selectedAlbum.art);
    expect(screen.getByText("<")).toBeInstanceOf(HTMLButtonElement);
    expect(screen.getByText(validProps.selectedAlbum.title)).toBeInstanceOf(
      HTMLHeadingElement
    );
    expect(screen.getByText(">")).toBeInstanceOf(HTMLButtonElement);
    expect(screen.getByAltText("tracklist")).toHaveAttribute("src", "menu.png");

    validProps.selectedAlbum.songs.forEach((song, i) => {
      expect(screen.getByText(song.name)).toBeInstanceOf(HTMLButtonElement);
    });
  });

  test("scrollTrackList", () => {
    render(
      <Tracklist
        data={validProps.data}
        selectedSong={validProps.selectedSong}
        selectedAlbum={validProps.selectedAlbum}
        handleSelectedSong={validProps.handleSelectedSong}
        handlePlaying={validProps.handlePlaying}
      />
    );

    expect(
      screen.queryByText(validProps.data[ALBUM_INDEX + 1].title)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(">"));
    expect(
      screen.getAllByText(validProps.data[ALBUM_INDEX + 1].title)[0]
    ).toBeInTheDocument();
    expect(
      screen.queryByText(validProps.selectedAlbum.title)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("<"));
    expect(
      screen.queryByText(validProps.data[ALBUM_INDEX + 1].title)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(validProps.selectedAlbum.title)
    ).toBeInTheDocument();
  });

  test("handleSelectSong and handlePlaying", () => {
    render(
      <Tracklist
        data={validProps.data}
        selectedSong={validProps.selectedSong}
        selectedAlbum={validProps.selectedAlbum}
        handleSelectedSong={validProps.handleSelectedSong}
        handlePlaying={validProps.handlePlaying}
      />
    );
    const buttonName = validProps.data[ALBUM_INDEX].songs[3].name;

    expect(validProps.handleSelectedSong).toBeCalledTimes(0);
    expect(validProps.handlePlaying).toBeCalledTimes(0);
    fireEvent.click(screen.getByText(buttonName));
    expect(validProps.handleSelectedSong).toBeCalledTimes(1);
    expect(validProps.handleSelectedSong).toBeCalledWith(buttonName);
    expect(validProps.handlePlaying).toBeCalledTimes(1);
    expect(validProps.handlePlaying).toBeCalledWith(true);
  });
});
