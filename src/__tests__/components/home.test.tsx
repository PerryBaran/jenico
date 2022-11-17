import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../components/routes/home/Home";
import socials from "../../media/socials";

describe("Home", () => {
  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(<Home />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(<Home />);

    expect(screen.getByText(/jenico/i)).toBeInstanceOf(HTMLHeadingElement);
    expect(screen.getByTestId("video")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    links.forEach((link, i) => {
      const social = socials[i];
      const image = screen.getByAltText(`${social.name} icon`);

      expect(link).toHaveAttribute("href", social.href);
      expect(image).toHaveAttribute("src", social.src);
      expect(screen.getByText(social.name)).toBeInTheDocument();
    });
  });
});