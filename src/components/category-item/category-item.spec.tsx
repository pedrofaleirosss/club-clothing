import { render, screen } from "@testing-library/react";
import CategoryItem from "./category-item.component";
import ICategory from "../../interfaces/category";
import { BrowserRouter } from "react-router-dom";

describe("Category Item", () => {
  it("should render categoty correctly", () => {
    const category: ICategory = {
      id: "1",
      displayName: "Lorem Ipsum",
      imageUrl: "image_url",
      name: "lorem-ipsum",
      products: [],
    };

    render(
      <BrowserRouter>
        <CategoryItem category={category} />
      </BrowserRouter>
    );

    screen.getByText("Lorem Ipsum");
    screen.getByText("Explorar");
  });
});
