import { render, screen } from "@testing-library/react";
import CustomButton from "./custom-button.component";

describe("Custom Button", () => {
  it("should render with correct children", () => {
    render(<CustomButton>lorem ipsum</CustomButton>);

    screen.getByText("lorem ipsum");
  });
});
