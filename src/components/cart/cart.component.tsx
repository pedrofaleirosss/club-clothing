import { BsCartCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
import { useAppSelector } from "../../hooks/redux.hooks";
import { toggleCart } from "../../store/reducers/cart/cart.actions";

const Cart = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer);
  const { productsTotalPrice, productsCount } = useContext(CartContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoToCheckoutClick = () => {
    navigate("/checkout");
    dispatch(toggleCart());
  };

  const handleCloseCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleCloseCartClick} />
      <CartContent>
        <CartTitle>
          Seu Carrinho
          <CartCloseIcon onClick={handleCloseCartClick}>
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
