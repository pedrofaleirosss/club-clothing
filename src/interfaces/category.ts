import IProduct from "./products";

interface ICategory {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  products: IProduct[];
}

export default ICategory;
