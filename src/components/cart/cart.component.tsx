import { BsCartCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";

// Components
import CustomButton from "../custom-button/custom-button.component";

// Styles
import {
  CartCloseIcon,
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from "./cart.styles";

// Utilities
import { CartContext } from "../../contexts/cart.context";

const Cart = () => {
  const { isVisible, toggleCart } = useContext(CartContext);

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>
          Seu Carrinho
          <CartCloseIcon onClick={toggleCart}>
            <IoClose size={24} />
          </CartCloseIcon>
        </CartTitle>

        <CartTotal>Total: R$999</CartTotal>
        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
