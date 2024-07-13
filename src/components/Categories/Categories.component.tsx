import { useEffect, useState } from "react";
import axios from "axios";

// Utilities
import ICategory from "../../interfaces/ICategory";
import env from "../../config/env.config";

// Styles
import "./Categories.styles.css";

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
      <div className="categories-content"></div>
    </div>
  );
};

export default Categories;
