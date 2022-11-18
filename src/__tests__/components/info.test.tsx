import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Info from "../../components/player/info/Info";

describe("Info", () => {
  const validProps = {
    albumArt: "art",
    albumName: "album name",
    songName: "song name",
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <Info
        albumArt={validProps.albumArt}
        albumName={validProps.albumName}
        songName={validProps.songName}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("corretly renders props", () => {
    render(
      <Info
        albumArt={validProps.albumArt}
        albumName={validProps.albumName}
        songName={validProps.songName}
      />
    );

    expect(
      screen.getByAltText(`${validProps.albumName} cover art`)
    ).toHaveAttribute("src", validProps.albumArt);
    expect(screen.getByText(validProps.albumName)).toBeInstanceOf(
      HTMLHeadingElement
    );
    expect(screen.getByText(validProps.songName)).toBeInTheDocument();
  });
});
