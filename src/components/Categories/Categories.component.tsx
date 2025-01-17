import { useContext, useEffect } from "react";

// Components
import CategoryItem from "../CategoryItem/CategoryItem.component";
import Loading from "../Loading/Loading.component";

// Styles
import { CategoriesContainer, CategoriesContent } from "./Categories.styles";

// Utilities
import { CategoryContext } from "../../contexts/category.context";

const Categories = () => {
  const { categories, fetchCategories, isLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
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
