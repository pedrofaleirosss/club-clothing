import * as firestore from "firebase/firestore";
import { renderWithRedux } from "../../helpers/test.helpers";
import Categories from "./categories.component";
import { screen } from "@testing-library/react";

jest.mock("firebase/firestore");

describe("Categories", () => {
  it("should fetch and show categories", async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockReturnValue([
      {
        data() {
          return {
            id: "1",
            displayName: "Category 1",
          };
        },
      },
    ]);

    mockedFirestore.collection.mockReturnValue({
      withConverter: () => {},
    });

    renderWithRedux(<Categories />, {});

    await screen.findByText("Category 1");
    screen.getByText(/explorar/i);
  });
});
