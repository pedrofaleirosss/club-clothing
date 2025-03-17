import IProduct from "../../../interfaces/products";
import CartActionTypes from "./cart.action-types";

export const toggleCart = () => ({
  type: CartActionTypes.toggleCart,
});

export const addProductToCart = (payload: IProduct) => ({
  type: CartActionTypes.addProductToCart,
  payload,
});
