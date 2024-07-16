import Header from "../../components/Header/Header.component";

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from "./Login.styles";

const LoginPage = () => {
  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          {/* Button */}

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>{/* email input */}</LoginInputContainer>
          <LoginInputContainer>{/* password input */}</LoginInputContainer>

          {/* button */}
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
