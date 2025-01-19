// Utilities
import { useNavigate } from "react-router-dom";
import ICategory from "../../interfaces/ICategory";

// Styles
import { CategoryItemContainer, CategoryName } from "./category-item.styles";

interface CategoryItemProps {
  category: ICategory;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <CategoryItemContainer $backgroundImage={category.imageUrl}>
      <CategoryName onClick={handleExploreClick}>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
