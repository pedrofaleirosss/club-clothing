import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

// Components
import CategoryItem from "../CategoryItem/CategoryItem.component";

// Styles
import { CategoriesContainer, CategoriesContent } from "./Categories.styles";

// Utilities
import ICategory from "../../interfaces/ICategory";
import { db } from "../../config/firebase.config";
import { categoryConverter } from "../../converters/firestore.converters";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
