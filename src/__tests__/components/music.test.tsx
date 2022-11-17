import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Music from "../../components/routes/music/Music";
import mockData from "../../media/songInfo";
import { SongInfo } from "../../Interface";
import { BrowserRouter as Router } from "react-router-dom";

const RenderWithRouter = (props: { data: SongInfo[] }) => {
  const { data } = props;

  return (
    <Router>
      <Music data={data} />
    </Router>
  );
};

describe("Music", () => {
  const validProps = {
    data: mockData,
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(<RenderWithRouter data={validProps.data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(<RenderWithRouter data={validProps.data} />);

    expect(screen.getByAltText(/background/)).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    links.forEach((link, i) => {
      const album = validProps.data[i];

      expect(link).toHaveAttribute("href", `/${album.title}`);
      expect(screen.getByAltText(`${album.title} album cover`)).toHaveAttribute(
        "src",
        album.art
      );
      expect(screen.getByText(album.title)).toBeInTheDocument();
    });
  });
});
