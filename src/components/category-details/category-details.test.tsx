import * as firestore from "firebase/firestore";
import ICategory from "../../interfaces/category";
import { renderWithRedux } from "../../helpers/test.helpers";
import CategoryDetails from "./category-details.component";
import { screen } from "@testing-library/react";

jest.mock("firebase/firestore");

describe("Category Details", () => {
  it("should fetch and show categories and its products", async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockImplementation(async () => ({
      docs: [
        {
          data(): ICategory {
            return {
              id: "1",
              displayName: "Category 1",
              imageUrl: "image_url",
              name: "category_1",
              products: [
                {
                  id: "1",
                  name: "Boné",
                  imageUrl: "image_url",
                  price: 100,
                },
              ],
            };
          },
        },
      ],
    }));

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    mockedFirestore.query.mockImplementation(() => {});
    mockedFirestore.where.mockImplementation(() => {});

    renderWithRedux(<CategoryDetails categoryId="any_id" />, {});

    await screen.findByText("Explorar Category 1");
    screen.getByText(/boné/i);
    screen.getByText("R$100");
  });
});
