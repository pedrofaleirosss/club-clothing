import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

// Utilities
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { logoutUser } from "../../store/toolkit/user/user.slice";
import { AppDispatch } from "../../store/store";
import { toggleCart } from "../../store/toolkit/cart/cart.slice";
import { useAppSelector } from "../../hooks/redux.hooks";
import { selectProductsCount } from "../../store/reducers/cart/cart.selectors";
import { useState } from "react";
import ConfirmationModal from "../confirmation-modal/confirmation-modal.component";

const Header = () => {
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  );

  const productsCount = useAppSelector(selectProductsCount);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleSignOutClick = () => {
    dispatch(logoutUser());
    signOut(auth);
    setShowSignOutModal(false);
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleHomeClick}>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <HeaderItem onClick={handleAccountClick}>Minha Conta</HeaderItem>
            <HeaderItem onClick={() => setShowSignOutModal(true)}>
              Sair
            </HeaderItem>
          </>
        )}
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>

      <ConfirmationModal
        isOpen={showSignOutModal}
        title="Sair da conta"
        description="Tem certeza de que deseja sair da sua conta?"
        confirmText="Sair"
        onConfirm={handleSignOutClick}
        onCancel={() => setShowSignOutModal(false)}
      />
    </HeaderContainer>
  );
};

export default Header;
