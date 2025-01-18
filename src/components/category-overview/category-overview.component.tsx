import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer,
} from "./category-overview.styles";

import ICategory from "../../interfaces/ICategory";

interface CategoryOverviewProps {
  category: ICategory;
}

const CategoryOverview = ({ category }: CategoryOverviewProps) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer></ProductsContainer>
    </CategoryContainer>
  );
};

export default CategoryOverview;
