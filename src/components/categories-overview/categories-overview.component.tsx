import { useContext, useEffect } from "react";

// Styles
import { Container } from "./categories-overview.styles";

// Utilities
import { CategoryContext } from "../../contexts/category.context";

// Components
import CategoryOverview from "../category-overview/category-overview.component";

const CategoriesOverview = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview category={category} key={category.id} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
