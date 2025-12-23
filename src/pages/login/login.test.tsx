import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import LoginPage from "./login.page";
import userEvent from "@testing-library/user-event";

import * as firebaseAuth from "firebase/auth";

jest.mock("firebase/auth");

describe("Login", () => {
  it("should show errors when trying to sibmit without filling all required fields", async () => {
    renderWithRedux(<LoginPage />, {});

    const submitButton = screen.getByText("Entrar");

    userEvent.click(submitButton);

    await screen.findByText(/o e-mail é obrigatório./i);
    screen.getByText(/a senha é obrigatória./i);
  });

  it("should show error when email is invalid", async () => {
    renderWithRedux(<LoginPage />, {});

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");

    userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByText("Entrar");

    userEvent.click(submitButton);

    await screen.findByText(/por favor, insira um e-mail válido./i);
  });

  it("should show error if email is incorrect", async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({
        code: firebaseAuth.AuthErrorCodes.INVALID_LOGIN_CREDENTIALS,
      })
    );

    renderWithRedux(<LoginPage />, {});

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "notfound@example.com");

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordInput, "12345678");

    const submitButton = screen.getByText("Entrar");

    userEvent.click(submitButton);

    await screen.findAllByText(/e-mail ou senha incorretos./i);
  });

  it("should show error if password is incorrect", async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({
        code: firebaseAuth.AuthErrorCodes.INVALID_LOGIN_CREDENTIALS,
      })
    );

    renderWithRedux(<LoginPage />, {});

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "notfound@example.com");

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordInput, "123456");

    const submitButton = screen.getByText("Entrar");

    userEvent.click(submitButton);

    await screen.findAllByText(/e-mail ou senha incorretos./i);
  });

  it("should show error if too many attempts were made", async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({
        code: firebaseAuth.AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER,
      })
    );

    renderWithRedux(<LoginPage />, {});

    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, "notfound@example.com");

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordInput, "12345678");

    const submitButton = screen.getByText("Entrar");

    for (let i = 0; i < 6; i++) {
      userEvent.click(submitButton);
    }

    await screen.findByText(
      /Muitas tentativas incorretas. Tente novamente mais tarde./i
    );
  });
});
