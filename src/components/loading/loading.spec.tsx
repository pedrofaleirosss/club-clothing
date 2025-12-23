import { render, screen } from "@testing-library/react";
import Loading from "./loading.component";

describe("Loading", () => {
  it("should show a message if there is one", () => {
    render(<Loading message="Aguarde..." />);

    screen.getByText("Aguarde...");
  });
});
