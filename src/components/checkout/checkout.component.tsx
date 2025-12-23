import { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import axios from "axios";

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
import Loading from "../loading/loading.component";

// Utilities
import { useAppSelector } from "../../hooks/redux.hooks";
import { selectProductsTotalPrice } from "../../store/reducers/cart/cart.selectors";
import MessageModal from "../message-modal/message-modal.component";

const Checkout = () => {
  const { products } = useAppSelector((state) => state.cartReducer);
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL!}/create-checkout-session`,
        {
          products,
        }
      );

      window.location.href = data.url;
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        return setCheckoutError(
          "Não foi possível conectar ao servidor de pagamento. Tente novamente em alguns instantes."
        );
      }

      setCheckoutError(
        "Ocorreu um erro ao processar o pagamento. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      {isLoading && <Loading />}
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

          <CustomButton
            startIcon={<BsBagCheck />}
            onClick={handleFinishPurchaseClick}
          >
            Finalizar Compra
          </CustomButton>
        </>
      ) : (
        <p>Seu carrinho está vazio!</p>
      )}

      <MessageModal
        isOpen={!!checkoutError}
        title="Erro no pagamento"
        description={checkoutError}
        variant="error"
        onClose={() => setCheckoutError("")}
      />
    </CheckoutContainer>
  );
};

export default Checkout;
