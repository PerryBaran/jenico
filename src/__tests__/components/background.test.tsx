import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Background from "../../components/background/Background";

describe("Background", () => {
  const validProps = {
    src: "string",
    video: true,
  };

  afterEach(cleanup);

  describe("image", () => {
    test("image snapshot", () => {
      const { asFragment } = render(<Background src={validProps.src} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("image props", () => {
      render(<Background src={validProps.src} />);
      const image = screen.getByRole("img");

      expect(image).toHaveAttribute("src", validProps.src);
      expect(image).toHaveAttribute("alt", "background");
    });
  });

  describe("video", () => {
    test("video snapshot", () => {
      const { asFragment } = render(
        <Background src={validProps.src} video={validProps.video} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("video props", () => {
      render(<Background src={validProps.src} video={validProps.video} />);
      const video = screen.getByTestId("video");

      expect(video).toHaveAttribute("src", validProps.src);
      expect(video).toHaveAttribute("autoPlay");
      expect(video).toHaveAttribute("loop");
      // no way to test muted attribute
    });
  });
});
