import { useContext } from "react";
import { BsBagCheck } from "react-icons/bs";

// Styles
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from "./checkout.styles";

// Components
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

// Utilities
import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
  const { products, productsTotalPrice } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>R${productsTotalPrice}</CheckoutTotal>

          <CustomButton startIcon={<BsBagCheck />}>
            Finalizar Compra
          </CustomButton>
        </>
      ) : (
        <p>Seu carrinho está vazio!</p>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
