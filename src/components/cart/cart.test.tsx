import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import Cart from "./cart.component";

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
  });
});
