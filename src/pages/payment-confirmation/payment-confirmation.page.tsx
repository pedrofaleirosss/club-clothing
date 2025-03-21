import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Styles
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent,
} from "./payment-confirmation.styles";

// Components
import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// Utilities
import Colors from "../../theme/theme.colors";
import { clearCartProducts } from "../../store/reducers/cart/cart.actions";
import { AppDispatch } from "../../store/store";

const PaymentConfirmationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const status = searchParams.get("success");
  const isCanceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (status === "true") {
      dispatch(clearCartProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleGoToHomePageClick = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === "true" && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <p>Sua compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status === "false" || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente.
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomePageClick}
          >
            Ir para a Página Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  );
};

export default PaymentConfirmationPage;
