import { useEffect, useState } from "react";
import axios from "axios";

// Components
import CategoryItem from "../CategoryItem/CategoryItem.component";

// Styles
import "./Categories.styles.css";

// Utilities
import ICategory from "../../interfaces/ICategory";
import env from "../../config/env.config";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}/api/category`);
      console.log({ data });
      setCategories(data);
    } catch (error) {
      console.log({ error });
    }
  };

  console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <div className="categories-content">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
