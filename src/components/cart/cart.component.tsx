import { BsCartCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Components
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

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
  const { isVisible, products, productsTotalPrice, productsCount, toggleCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleGoToCheckoutClick = () => {
    navigate("/checkout");
    toggleCart();
  };
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

        {products.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton
            startIcon={<BsCartCheck />}
            onClick={handleGoToCheckoutClick}
          >
            Ir para o Checkout
          </CustomButton>
        )}

        {productsCount === 0 && <p>Seu carrinho está vazio!</p>}
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
