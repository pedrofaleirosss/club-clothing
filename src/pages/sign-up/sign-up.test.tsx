import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import SignUpPage from "./sign-up.page";
import userEvent from "@testing-library/user-event";

describe("Sign Up", () => {
  it("should show error when trying to submit without filling all required fields", async () => {
    renderWithRedux(<SignUpPage />, {});

    const submitButton = screen.getByText("Criar Conta", {
      selector: "button",
    });

    userEvent.click(submitButton);

    await screen.findByText(/o nome é obrigatório./i);
    screen.getByText(/o sobrenome é obrigatório./i);
    screen.getByText(/o e-mail é obrigatório./i);
    screen.getByText(/a senha é obrigatória./i);
    screen.getByText(/a confirmação de senha é obrigatória./i);
  });

  it("should show error when filling and invalid email", async () => {
    renderWithRedux(<SignUpPage />, {});

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByText("Criar Conta", {
      selector: "button",
    });

    userEvent.click(submitButton);

    await screen.findByText(/por favor, insira um e-mail válido./i);
  });
});
