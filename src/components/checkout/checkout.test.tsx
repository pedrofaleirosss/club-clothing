import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import Checkout from "./checkout.component";

describe("Checkout", () => {
  it("should show correct products and total price", () => {
    renderWithRedux(<Checkout />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: "1",
              imageUrl: "image_url",
              name: "Product 1",
              price: 100,
              quantity: 1,
            },
            {
              id: "2",
              imageUrl: "image_url",
              name: "Product 2",
              price: 200,
              quantity: 1,
            },
            {
              id: "3",
              imageUrl: "image_url",
              name: "Product 3",
              price: 300,
              quantity: 1,
            },
          ],
        },
      },
    } as any);

    screen.getByText("Total: R$600");
    screen.getByText(/finalizar compra/i);
    screen.getByText(/checkout/i);
  });

  it("should show empty message if cart is empty and not show checkout button", () => {
    renderWithRedux(<Checkout />, {
      preloadedState: {
        cartReducer: { products: [] },
      },
    } as any);

    screen.getByText(/seu carrinho está vazio!/i);
    expect(screen.queryByText(/finalizar compra/i)).toBeNull();
  });
});
