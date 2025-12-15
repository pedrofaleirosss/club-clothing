import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../helpers/test.helpers";
import ICategory from "../../interfaces/category";
import CategoryOverview from "./category-overview.component";

describe("Category Overview", () => {
  it("should show correct category and its products", () => {
    const category: ICategory = {
      displayName: "Category 1",
      id: "1",
      imageUrl: "image_url",
      name: "category1",
      products: [
        {
          id: "1",
          imageUrl: "image_url",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          imageUrl: "image_url",
          name: "Product 2",
          price: 200,
        },
        {
          id: "3",
          imageUrl: "image_url",
          name: "Product 3",
          price: 300,
        },
        {
          id: "4",
          imageUrl: "image_url",
          name: "Product 4",
          price: 400,
        },
        {
          id: "5",
          imageUrl: "image_url",
          name: "Product 5",
          price: 500,
        },
      ],
    };

    renderWithRedux(<CategoryOverview category={category} />, {});

    screen.getByText(/category 1/i);

    // Products
    screen.getByText("Product 1");
    screen.getByText("R$100");

    screen.getByText("Product 2");
    screen.getByText("R$200");

    screen.getByText("Product 3");
    screen.getByText("R$300");

    screen.getByText("Product 4");
    screen.getByText("R$400");

    expect(screen.queryByText("Product 5")).toBeNull();
  });
});
