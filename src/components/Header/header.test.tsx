import { screen } from "@testing-library/react";
import Header from "./header.component";
import { renderWithRedux } from "../../helpers/test.helpers";

describe("Header", () => {
  it("should show sign out button when user is authenticated", () => {
    renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: true } },
    } as any);

    screen.getByText("Sair");
  });

  it("should show sign in and sign up buttons when user is not authenticated", () => {
    renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: false } },
    } as any);

    screen.getByText("Login");
    screen.getByText(/criar conta/i);
  });
});
