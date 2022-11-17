import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../../components/routes/contact/Contact";
import * as sendEmail from "../../services/emailJS";

describe("Contact", () => {
  const validProps = {
    handleFormFocus: jest.fn(),
  };

  afterEach(cleanup);

  test("snapshot", () => {
    const { asFragment } = render(
      <Contact handleFormFocus={validProps.handleFormFocus} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(<Contact handleFormFocus={validProps.handleFormFocus} />);
    const inputs = screen.getAllByRole("textbox");

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toHaveAttribute("for", "name");
    expect(screen.getByText(/email/i)).toHaveAttribute("for", "email");
    expect(screen.getByText(/subject/i)).toHaveAttribute("for", "subject");
    expect(screen.getByText(/message/i)).toHaveAttribute("for", "message");
    expect(screen.getByText(/submit/i)).toHaveAttribute("type", "submit");
    expect(inputs[0]).toHaveAttribute("name", "name");
    expect(inputs[0]).toHaveAttribute("required");
    expect(inputs[1]).toHaveAttribute("type", "email");
    expect(inputs[1]).toHaveAttribute("name", "email");
    expect(inputs[1]).toHaveAttribute("required");
    expect(inputs[2]).toHaveAttribute("name", "subject");
    expect(inputs[2]).toHaveAttribute("required");
    expect(inputs[3]).toHaveAttribute("name", "message");
    expect(inputs[3]).toHaveAttribute("required");
  });

  test("focus and blur", () => {
    render(<Contact handleFormFocus={validProps.handleFormFocus} />);
    const inputs = screen.getAllByRole("textbox");

    expect(validProps.handleFormFocus).toBeCalledTimes(0);
    inputs.forEach((input) => {
      input.focus();
      expect(validProps.handleFormFocus).lastCalledWith(true);
      input.blur();
      expect(validProps.handleFormFocus).lastCalledWith(false);
    });
  });

  test("form submit", () => {
    const mockSendEmail = jest.fn();
    const mockAlert = jest.fn();
    jest.spyOn(sendEmail, "default").mockImplementation(mockSendEmail);
    jest.spyOn(window, "alert").mockImplementation(mockAlert);
    render(<Contact handleFormFocus={validProps.handleFormFocus} />);
    const inputs = screen.getAllByRole("textbox");
    const submit = screen.getByText(/submit/i);

    submit.click();
    expect(mockSendEmail).toBeCalledTimes(0);
    fireEvent.change(inputs[0], { target: { value: "valid name" } });
    submit.click();
    expect(mockAlert).lastCalledWith("all form fields must be filled");
    expect(mockSendEmail).toBeCalledTimes(0);
    fireEvent.change(inputs[1], { target: { value: "not valid email" } });
    submit.click();
    expect(mockAlert).lastCalledWith("all form fields must be filled");
    expect(mockSendEmail).toBeCalledTimes(0);
    fireEvent.change(inputs[2], { target: { value: "valid subject" } });
    expect(mockAlert).lastCalledWith("all form fields must be filled");
    submit.click();
    expect(mockSendEmail).toBeCalledTimes(0);
    fireEvent.change(inputs[3], { target: { value: "valid@email.com" } });
    submit.click();
    expect(mockAlert).lastCalledWith("invalid email");
    fireEvent.change(inputs[1], { target: { value: "valid@email.com" } });
    act(() => submit.click());
    expect(mockSendEmail).toBeCalledTimes(1);
  });
});
