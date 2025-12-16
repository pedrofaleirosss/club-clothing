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

  it("should show error when password and confirmation password do not match", async () => {
    renderWithRedux(<SignUpPage />, {});

    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Digite sua senha novamente"
    );

    userEvent.type(passwordInput, "12345678");
    userEvent.type(confirmPasswordInput, "87654321");

    const submitButton = screen.getByText("Criar Conta", {
      selector: "button",
    });

    userEvent.click(submitButton);

    await screen.findByText(
      /a confirmação de senha precisa ser igual a senha./i
    );
  });

  it("should show error when password is less than 6 characters", async () => {
    renderWithRedux(<SignUpPage />, {});

    const passwordInput = screen.getByPlaceholderText("Digite sua senha");

    userEvent.type(passwordInput, "123");

    const submitButton = screen.getByText("Criar Conta", {
      selector: "button",
    });

    userEvent.click(submitButton);

    await screen.findByText(/a senha precisa ter no mínimo 6 caracteres./i);
  });
});
