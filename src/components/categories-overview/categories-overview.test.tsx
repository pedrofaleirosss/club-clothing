import * as firestore from "firebase/firestore";
import ICategory from "../../interfaces/category";
import { renderWithRedux } from "../../helpers/test.helpers";
import CategoriesOverview from "./categories-overview.component";
import { screen } from "@testing-library/react";

jest.mock("firebase/firestore");

describe("Categories Overview", () => {
  it("should fetch and show categories", async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data(): ICategory {
          return {
            id: "1",
            displayName: "Category 1",
            imageUrl: "image_url",
            name: "category_1",
            products: [
              { id: "1", name: "Boné", imageUrl: "image_url", price: 100 },
            ],
          };
        },
      },
    ]);

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    renderWithRedux(<CategoriesOverview />, {});

    await screen.findByText(/boné/i);
    screen.getByText("Category 1");
    screen.getByText("R$100");
  });
});
