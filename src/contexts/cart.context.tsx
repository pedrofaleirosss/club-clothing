import { createContext, ReactNode, useState } from "react";
import ICartProduct from "../interfaces/cart";
import IProduct from "../interfaces/products";

interface ICartContext {
  isVisible: boolean;
  products: ICartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: IProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
});

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ICartProduct[]>([]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: IProduct) => {
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  return (
    <CartContext.Provider
      value={{ isVisible, products, toggleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
