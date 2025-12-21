import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";

// Components
import Header from "../../components/header/header.component";
import Footer from "../../components/footer/footer.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// Styles
import {
  AccountContainer,
  AccountContent,
  AccountHeadline,
  Avatar,
  UserInfo,
  InfoItem,
} from "./account.styles";

// Utils
import { auth } from "../../config/firebase.config";
import { useAppSelector } from "../../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/toolkit/user/user.slice";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.userReducer);

  if (!currentUser) return null;

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`;

  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <Header />

      <AccountContainer>
        <AccountContent>
          <AccountHeadline>Minha Conta</AccountHeadline>

          <Avatar>{initials}</Avatar>

          <UserInfo>
            <InfoItem>
              <strong>Nome</strong>
              <span>
                {currentUser.firstName} {currentUser.lastName}
              </span>
            </InfoItem>

            <InfoItem>
              <strong>Email</strong>
              <span>{currentUser.email}</span>
            </InfoItem>

            <InfoItem>
              <strong>Tipo de Login</strong>
              <span>
                {currentUser.provider === "firebase"
                  ? "Email/Senha"
                  : currentUser.provider === "google" && "Google"}
              </span>
            </InfoItem>
          </UserInfo>

          <CustomButton
            startIcon={<FiLogOut size={18} />}
            onClick={handleLogout}
          >
            Sair da Conta
          </CustomButton>
        </AccountContent>
      </AccountContainer>

      <Footer />
    </>
  );
};

export default AccountPage;
