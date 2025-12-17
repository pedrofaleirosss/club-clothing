import { render, screen } from "@testing-library/react";
import Footer from "./footer.component";

describe("Footer", () => {
  it("should render Footer component", () => {
    render(<Footer />);

    expect(screen.getByText(/club clothing/i)).toBeInTheDocument();

    expect(
      screen.getByText(/todos os direitos reservados/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/desenvolvido por pedro faleiros/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}`))
    ).toBeInTheDocument();
  });
});
