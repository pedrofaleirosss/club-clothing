import { render, screen } from "@testing-library/react";
import CustomInput from "./custom-input.component";
import Colors from "../../theme/theme.colors";

describe("Custom Input", () => {
  it("should render with error if hasError is true", () => {
    render(<CustomInput placeholder="Lorem Ipsum" hasError={true} />);

    const input = screen.getByPlaceholderText("Lorem Ipsum");

    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` });
  });
});
