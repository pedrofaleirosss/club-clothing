import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import LoginPage from "./login.page";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  it("should show errors when trying to sibmit without filling all required fields", async () => {
    renderWithRedux(<LoginPage />, {});

    const submitButton = screen.getByText("Entrar");

    userEvent.click(submitButton);

    await screen.findByText(/o e-mail é obrigatório./i);
    screen.getByText(/a senha é obrigatória./i);
  });
});
