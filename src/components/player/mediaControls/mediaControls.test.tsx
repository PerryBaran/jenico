import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaControls from "./MediaControls";
import { useState } from "react";

afterEach(cleanup);

const RenderWithProps = ({ play = true }) => {
  const [playing, setPlaying] = useState(play);

  return (
    <MediaControls
      playing={playing}
      setPlaying={setPlaying}
      skipSong={() => {}}
    />
  );
};

it("renders without crashing", () => {
  render(<RenderWithProps />);
});

describe("img", () => {
  it("contains 3 images", () => {
    render(<RenderWithProps />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(3);
  });
  it("has correct alt tags", () => {
    render(<RenderWithProps />);
    const imgs = screen.getAllByRole("img");
    expect(imgs[0]).toHaveAttribute("alt", "skip backward");
    expect(imgs[1]).toHaveAttribute("alt", "play/pause");
    expect(imgs[2]).toHaveAttribute("alt", "skip forward");
  });
  it("has correct src", () => {
    render(<RenderWithProps />);
    const imgs = screen.getAllByRole("img");
    expect(imgs[0]).toHaveAttribute("src", "skip.png");
    expect(imgs[1]).toHaveAttribute("src", "pause.png");
    expect(imgs[2]).toHaveAttribute("src", "skip.png");
  });
  it("correclt loads img src on playing change", () => {
    render(<RenderWithProps play={false} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs[1]).toHaveAttribute("src", "play.png");
  });
});

describe("buttons", () => {
  it("contains 3 buttons", () => {
    render(<RenderWithProps />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
  it("changes img on button click", () => {
    render(<RenderWithProps />);
    const button = screen.getAllByRole("button")[1];
    const img = screen.getAllByRole("img")[1];
    expect(img).toHaveAttribute("src", "pause.png");
    fireEvent.click(button);
    expect(img).toHaveAttribute("src", "play.png");
  });
});
