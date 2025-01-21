import IProduct from "./products";

interface ICartProduct extends IProduct {
  quantity: number;
}

export default ICartProduct;
