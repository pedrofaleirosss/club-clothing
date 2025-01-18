// Utilities
import ICategory from "../../interfaces/ICategory";

// Styles
import { CategoryItemContainer, CategoryName } from "./category-item.styles";

interface CategoryItemProps {
  category: ICategory;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <CategoryItemContainer $backgroundImage={category.imageUrl}>
      <CategoryName>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
