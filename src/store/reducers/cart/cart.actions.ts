import IProduct from "../../../interfaces/products";
import CartActionTypes from "./cart.action-types";

interface ToggleCartAction {
  type: typeof CartActionTypes.toggleCart;
}

interface AddProductToCartAction {
  type: typeof CartActionTypes.addProductToCart;
  payload: IProduct;
}

interface RemoveProductFromCartAction {
  type: typeof CartActionTypes.removeProductFromCart;
  payload: string;
}

interface IncreaseCartProductQuantityAction {
  type: typeof CartActionTypes.increaseCartProductQuantity;
  payload: string;
}

interface DecreaseCartProductQuantityAction {
  type: typeof CartActionTypes.decreaseCartProductQuantity;
  payload: string;
}

interface ClearCartProductsAction {
  type: typeof CartActionTypes.clearCartProducts;
}

export const toggleCart = (): ToggleCartAction => ({
  type: CartActionTypes.toggleCart,
});

export const addProductToCart = (
  payload: IProduct
): AddProductToCartAction => ({
  type: CartActionTypes.addProductToCart,
  payload,
});

export const removeProductFromCart = (
  payload: string
): RemoveProductFromCartAction => ({
  type: CartActionTypes.removeProductFromCart,
  payload,
});

export const increaseCartProductQuantity = (
  payload: string
): IncreaseCartProductQuantityAction => ({
  type: CartActionTypes.increaseCartProductQuantity,
  payload,
});

export const decreaseCartProductQuantity = (
  payload: string
): DecreaseCartProductQuantityAction => ({
  type: CartActionTypes.decreaseCartProductQuantity,
  payload,
});

export const clearCartProducts = (): ClearCartProductsAction => ({
  type: CartActionTypes.clearCartProducts,
});

export type CartActions =
  | ToggleCartAction
  | AddProductToCartAction
  | IncreaseCartProductQuantityAction
  | DecreaseCartProductQuantityAction
  | RemoveProductFromCartAction
  | ClearCartProductsAction;
