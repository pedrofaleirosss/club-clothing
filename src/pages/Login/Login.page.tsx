import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Components
import CustomButton from "../../components/CustomButton/CustomButton.component";
import Header from "../../components/Header/Header.component";
import CustomInput from "../../components/CustomInput/CustomInput.component";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage.component";

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from "./Login.styles";

//Utilities
import { auth } from "../../config/firebase.config";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log(userCredentials);
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        return setError("password", { type: "manyAttempts" });
      }

      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setError("email", { type: "invalidCredentials" });
        return setError("password", { type: "invalidCredentials" });
      }
    }
  };

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>

            <CustomInput
              hasError={!!errors?.email}
              placeholder="Digite seu e-mail"
              {...register("email", {
                required: true,
                validate: (value) => {
                  return isEmail(value);
                },
              })}
            />

            {errors?.email?.type === "required" && (
              <InputErrorMessage>O e-mail é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === "validate" && (
              <InputErrorMessage>
                Por favor, insira um e-mail válido.
              </InputErrorMessage>
            )}

            {errors?.email?.type === "invalidCredentials" && (
              <InputErrorMessage>E-mail ou senha incorretos.</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>

            <CustomInput
              hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register("password", { required: true })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === "invalidCredentials" && (
              <InputErrorMessage>E-mail ou senha incorretos.</InputErrorMessage>
            )}

            {errors?.password?.type === "manyAttempts" && (
              <InputErrorMessage>
                Muitas tentativas incorretas. Tente novamente mais tarde.
              </InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
