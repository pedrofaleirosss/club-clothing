// Styles
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer,
} from "./category-overview.styles";

// Utilities
import ICategory from "../../interfaces/ICategory";

// Components
import ProductItem from "../product-item/product-item.component";

interface CategoryOverviewProps {
  category: ICategory;
}

const CategoryOverview = ({ category }: CategoryOverviewProps) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </CategoryContainer>
  );
};

export default CategoryOverview;
