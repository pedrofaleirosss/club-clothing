import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

// Utilities
import { CartContext } from "../../contexts/cart.context";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { logoutUser } from "../../store/reducers/user/user.actions";
import { AppDispatch } from "../../store/store";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  const { productsCount, toggleCart } = useContext(CartContext);

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

  const handleSignOutClick = () => {
    dispatch(logoutUser());
    signOut(auth);
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
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
