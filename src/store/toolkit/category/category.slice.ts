import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import { categoryConverter } from "../../../converters/firestore.converters";
import ICategory from "../../../interfaces/category";

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const categoriesFromFirestore: ICategory[] = [];

  const querySnapshot = await getDocs(
    collection(db, "categories").withConverter(categoryConverter)
  );

  querySnapshot.forEach((doc) => {
    categoriesFromFirestore.push(doc.data());
  });

  return categoriesFromFirestore;
});

interface InitialState {
  categories: ICategory[];
  isLoading: boolean;
}

const initialState: InitialState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Início da action
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    // Caso de sucesso
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    // Caso de erro
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
