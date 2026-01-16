import { screen } from "@testing-library/react";
import Header from "./header.component";
import { renderWithRedux } from "../../helpers/test.helpers";
import ICartProduct from "../../interfaces/cart";

describe("Header", () => {
  it("should show sign out button and my account button when user is authenticated", () => {
    renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: true } },
    } as any);

    screen.getByText("Sair");
    screen.getByText(/minha conta/i);
  });

  it("should show sign in and sign up buttons when user is not authenticated", () => {
    renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: false } },
    } as any);

    screen.getByText("Login");
    screen.getByText(/criar conta/i);
  });

  it("should show correct cart products count", () => {
    const products: ICartProduct[] = [
      {
        id: "1",
        imageUrl: "image-url",
        name: "Boné",
        price: 100,
        quantity: 2,
      },
      {
        id: "2",
        imageUrl: "image-url-2",
        name: "Camiseta",
        price: 150,
        quantity: 3,
      },
    ];

    renderWithRedux(<Header />, {
      preloadedState: { cartReducer: { products } },
    } as any);

    screen.getByText("5");
  });
});
