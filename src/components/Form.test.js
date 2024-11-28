import { render, screen, fireEvent } from "@testing-library/react";
import App from "./Form.js";

describe("Form Validation Tests", () => {
  it("should submit the form successfully with valid inputs", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: "password123" } });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
  });

  it("should show an error for an invalid phone number", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: "12345" } }); // Invalid phone
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText("Phone number must be 10 digits.")).toBeInTheDocument();
  });

  it("should show an error if passwords do not match", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: "different123" } }); // Mismatched passwords
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });
});
