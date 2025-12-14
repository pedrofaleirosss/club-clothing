import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import Cart from "./cart.component";
import userEvent from "@testing-library/user-event";

describe("Cart", () => {
  it("should show correct cart products", () => {
    renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: "1",
              imageUrl: "image_url",
              name: "Boné",
              price: 100,
              quantity: 2,
            },
          ],
        },
      },
    } as any);

    screen.getByText(/boné/i);
    screen.getByText("R$100");
    screen.getByText("2");
    screen.getByText("Total: R$200");
    screen.getByText(/ir para o checkout/i);
  });

  it("should not show checkout button and should show an empty message when cart is empty", () => {
    renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [],
        },
      },
    } as any);

    screen.getByText(/seu carrinho está vazio!/i);
    expect(screen.queryByText(/ir para o checkout/i)).toBeNull();
  });

  it("should increase product quantity on increase click", () => {
    renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: "1",
              imageUrl: "image_url",
              name: "Boné",
              price: 100,
              quantity: 2,
            },
          ],
        },
      },
    } as any);

    const increaseButton = screen.getByLabelText(
      /aumentar quantidade de boné/i
    );

    userEvent.click(increaseButton);

    screen.getByText("3");
  });
});
