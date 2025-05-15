import { render, screen } from "@testing-library/react";
import CustomInput from "./custom-input.component";
import Colors from "../../theme/theme.colors";
import userEvent from "@testing-library/user-event";

describe("Custom Input", () => {
  it("should render with error if hasError is true", () => {
    render(<CustomInput placeholder="Lorem Ipsum" hasError={true} />);

    const input = screen.getByPlaceholderText("Lorem Ipsum");

    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` });
  });

  it("should render without error if hasError is false", () => {
    render(<CustomInput placeholder="Lorem Ipsum" hasError={false} />);

    const input = screen.getByPlaceholderText("Lorem Ipsum");

    expect(input).toHaveStyle({ border: "none" });
  });

  it("should change value when user types", () => {
    render(<CustomInput placeholder="Lorem Ipsum" hasError={false} />);

    const input = screen.getByPlaceholderText("Lorem Ipsum");

    userEvent.type(input, "Dolor Sit");

    screen.getByDisplayValue("Dolor Sit");
  });
});
