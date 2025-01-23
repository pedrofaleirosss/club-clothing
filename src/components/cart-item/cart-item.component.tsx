import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";

// Utilities
import ICartProduct from "../../interfaces/cart";

// Styles
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./cart-item.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

interface CartItemProps {
  product: ICartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useContext(CartContext);

  const handleRemoveClick = () => {
    removeProductFromCart(product.id);
  };

  const handleIncreaseClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleDecreaseClick = () => {
    decreaseProductQuantity(product.id);
  };

  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} onClick={handleDecreaseClick} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncreaseClick} />
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton onClick={handleRemoveClick}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
