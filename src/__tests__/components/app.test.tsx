import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App";

describe("App", () => {
  afterEach(cleanup);

  // prevents error "Not implemented: HTMLMediaElement.prototype.pause"
  jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(jest.fn());

  test("snapshot", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("Navbar links", () => {
    render(<App />);

    expect(screen.getByText(/spotify/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/music/i));
    expect(screen.getByText(/lysergic/i)).toBeInTheDocument();
    expect(screen.queryByText(/spotify/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/jenico/i));
    expect(screen.getByText(/spotify/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/contact/i));
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/spotify/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/home/i));
    expect(screen.getByText(/spotify/i)).toBeInTheDocument();
  });

  test("Music links", () => {
    render(<App />);

    fireEvent.click(screen.getByText(/music/i));
    fireEvent.click(screen.getByText(/ethereal/i));
    expect(screen.getByText(/distressed/i)).toBeInTheDocument();
  });
});
