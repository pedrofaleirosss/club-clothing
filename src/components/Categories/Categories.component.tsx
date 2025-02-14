import { useContext, useEffect } from "react";

// Components
import CategoryItem from "../category-item/category-item.component";
import Loading from "../loading/loading.component";

// Styles
import { CategoriesContainer, CategoriesContent } from "./categories.styles";

// Utilities
import { CategoryContext } from "../../contexts/category.context";

const Categories = () => {
  const { categories, fetchCategories, isLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
