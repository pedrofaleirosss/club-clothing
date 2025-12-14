import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import ICartProduct from "../../interfaces/cart";
import CartItem from "./cart-item.component";

describe("Cart Item", () => {
  it("should show correct cart item", () => {
    const cartItem: ICartProduct = {
      id: "1",
      imageUrl: "image_url",
      name: "Boné",
      price: 100,
      quantity: 1,
    };

    renderWithRedux(<CartItem product={cartItem} />, {});

    screen.getByText(/boné/i);
    screen.getByText("R$100");
    screen.getByText("1");
    screen.getByLabelText(/aumentar quantidade de boné/i);
    screen.getByLabelText(/diminuir quantidade de boné/i);
    screen.getByLabelText(/remover boné do carrinho/i);
  });
});
