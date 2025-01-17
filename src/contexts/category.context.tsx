import { createContext, ReactNode, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

// Utilities
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converters/firestore.converters";
import ICategory from "../interfaces/ICategory";

interface ICategoryContext {
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
  isLoading: boolean;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
  isLoading: false,
});

interface CategoryContextProps {
  children: ReactNode;
}

const CategoryContextProvider = ({ children }: CategoryContextProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoriesFromFirestore: ICategory[] = [];
      const querySnapshot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter)
      );

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });

      setCategories(categoriesFromFirestore);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
