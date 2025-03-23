import { Dispatch } from "redux";
import ICategory from "../../../interfaces/category";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import { categoryConverter } from "../../../converters/firestore.converters";
import CategoryActionTypes from "./category.action-types";

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES_START });

    try {
      const categoriesFromFirestore: ICategory[] = [];

      const querySnapshot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter)
      );

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });

      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesFromFirestore,
      });
    } catch (error) {
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
      });
    }
  };
};
