// Utilities
import ICategory from "../../interfaces/ICategory";

// Styles
import "./CategoryItem.styles.css";

interface CategoryItemProps {
  category: ICategory;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div
      className="category-item-container"
      style={{ backgroundImage: category.imageUrl }}
    >
      <div className="category-name">
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </div>
    </div>
  );
};

export default CategoryItem;
