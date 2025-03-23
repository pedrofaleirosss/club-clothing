import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Styles
import { Container } from "./categories-overview.styles";

// Utilities
import { fetchCategories } from "../../store/reducers/category/category.actions";
import { useAppSelector } from "../../hooks/redux.hooks";

// Components
import CategoryOverview from "../category-overview/category-overview.component";
import Loading from "../loading/loading.component";

const CategoriesOverview = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories() as any);
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
