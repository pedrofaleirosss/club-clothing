import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import AccountPage from "./account.page";
import userEvent from "@testing-library/user-event";

const user = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

describe("Account", () => {
  it("should render account page correctly", () => {
    renderWithRedux(<AccountPage />, {
      preloadedState: {
        userReducer: {
          currentUser: {
            ...user,
            provider: "firebase",
          },
          isAuthenticated: true,
        },
      },
    });

    screen.getAllByText("Minha Conta");
    screen.getByText("JD");
    screen.getByText("John Doe");
    screen.getByText("john.doe@example.com");
    screen.getByText("Email/Senha");
    screen.getByText(/sair da conta/i);
    screen.getByText(/excluir conta/i);
  });

  it("should show google provider when user signed in with google", () => {
    renderWithRedux(<AccountPage />, {
      preloadedState: {
        userReducer: {
          currentUser: {
            ...user,
            provider: "google",
          },
          isAuthenticated: true,
        },
      },
    });

    screen.getByText("Google");
  });

  it("should open sign out modal when clicking sign out button", async () => {
    renderWithRedux(<AccountPage />, {
      preloadedState: {
        userReducer: {
          currentUser: {
            ...user,
            provider: "google",
          },
          isAuthenticated: true,
        },
      },
    });

    const signOutButton = screen.getByText(/sair da conta/i);
    userEvent.click(signOutButton);

    await screen.findByText(/tem certeza de que deseja sair da sua conta\?/i);
  });

  it("should open delete account modal when clicking delete account button and request password if provider is email/password", async () => {
    renderWithRedux(<AccountPage />, {
      preloadedState: {
        userReducer: {
          currentUser: {
            ...user,
            provider: "firebase",
          },
          isAuthenticated: true,
        },
      },
    });

    const deleteAccountButton = screen.getByText(/excluir conta/i);
    userEvent.click(deleteAccountButton);

    await screen.findByText(
      /para confirmar a exclusão da sua conta, digite sua senha./i,
    );
  });

  it("should open delete account modal when clicking delete account button without requesting password if provider is google", async () => {
    renderWithRedux(<AccountPage />, {
      preloadedState: {
        userReducer: {
          currentUser: {
            ...user,
            provider: "google",
          },
          isAuthenticated: true,
        },
      },
    });

    const deleteAccountButton = screen.getByText(/excluir conta/i);
    userEvent.click(deleteAccountButton);

    await screen.findByText(/essa ação é permanente e não pode ser desfeita./i);
  });
});
