import { useContext, useEffect } from "react";

// Styles
import { Container } from "./categories-overview.styles";

// Utilities
import { CategoryContext } from "../../contexts/category.context";

// Components
import CategoryOverview from "../category-overview/category-overview.component";
import Loading from "../loading/loading.component";

const CategoriesOverview = () => {
  const { categories, fetchCategories, isLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview category={category} key={category.id} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
