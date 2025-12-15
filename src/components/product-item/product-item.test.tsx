import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import IProduct from "../../interfaces/products";
import ProductItem from "./product-item.component";

describe("Product Item", () => {
  it("should show correct product", () => {
    const product: IProduct = {
      id: "1",
      imageUrl: "image_url",
      name: "Boné",
      price: 100,
    };
    renderWithRedux(<ProductItem product={product} />, {});

    screen.getByText(/boné/i);
    screen.getByText("R$100");
    screen.getByText(/adicionar ao carrinho/i);
  });
});
