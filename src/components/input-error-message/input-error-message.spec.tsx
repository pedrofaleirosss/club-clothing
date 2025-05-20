import { render, screen } from "@testing-library/react";
import InputErrorMessage from "./input-error-message.component";
import Colors from "../../theme/theme.colors";

describe("Input Error Message", () => {
  it("should show message with error color", () => {
    render(<InputErrorMessage>Lorem Ipsum</InputErrorMessage>);

    const message = screen.getByText("Lorem Ipsum");

    expect(message).toHaveStyle({ color: Colors.error });
  });
});
