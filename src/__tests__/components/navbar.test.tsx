import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

const RenderWithRouter = () => {
  return (
    <Router>
      <Navbar />
    </Router>
  );
};

describe("Navbar", () => {
  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(<RenderWithRouter />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("props", () => {
    render(<RenderWithRouter />);

    expect(screen.getByText(/jenico/i)).toHaveAttribute("href", "/");
    expect(screen.getByText(/home/i)).toHaveAttribute("href", "/");
    expect(screen.getByText(/music/i)).toHaveAttribute("href", "/music");
    expect(screen.getByText(/contact/i)).toHaveAttribute("href", "/contact");
  });
});
