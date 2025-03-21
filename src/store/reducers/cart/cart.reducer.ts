import ICartProduct from "../../../interfaces/cart";
import CartActionTypes from "./cart.action-types";

interface InitialState {
  isVisible: boolean;
  products: ICartProduct[];
}

const initialState: InitialState = {
  isVisible: false,
  products: [],
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CartActionTypes.toggleCart:
      return { ...state, isVisible: !state.isVisible };

    case CartActionTypes.addProductToCart: {
      const product = action.payload;
      const productIsAlreadyInCart = state.products.some(
        (item) => item.id === product.id
      );

      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
      };
    }

    case CartActionTypes.removeProductFromCart:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case CartActionTypes.increaseCartProductQuantity:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };

    case CartActionTypes.decreaseCartProductQuantity:
      return {
        ...state,
        products: state.products
          .map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0),
      };

    case CartActionTypes.clearCartProducts:
      return {
        ...state,
        products: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
