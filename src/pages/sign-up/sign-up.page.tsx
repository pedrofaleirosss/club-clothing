import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import CustomButton from "../../components/custom-button/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import Header from "../../components/header/header.component";
import InputErrorMessage from "../../components/input-error-message/input-error-message.component";
import Loading from "../../components/loading/loading.component";

// Styles
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from "./sign-up.styles";

// Utilities
import { auth, db } from "../../config/firebase.config";
import { useAppSelector } from "../../hooks/redux.hooks";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();
  const [isLoading, setIsLoading] = useState(false);

  const watchPassword = watch("password");

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await addDoc(collection(db, "users"), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: "firebase",
      });
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError("email", { type: "alreadyInUse" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              hasError={!!errors?.firstName}
              placeholder="Digite seu nome"
              {...register("firstName", {
                required: true,
              })}
            />

            {errors?.firstName?.type === "required" && (
              <InputErrorMessage>O nome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              hasError={!!errors?.lastName}
              placeholder="Digite seu sobrenome"
              {...register("lastName", {
                required: true,
              })}
            />

            {errors?.lastName?.type === "required" && (
              <InputErrorMessage>O sobrenome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
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

            {errors?.email?.type === "alreadyInUse" && (
              <InputErrorMessage>
                Este e-mail já extá sendo utilizado.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === "minLength" && (
              <InputErrorMessage>
                A senha precisa ter no mínimo 6 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              hasError={!!errors?.passwordConfirmation}
              placeholder="Digite sua senha novamente"
              type="password"
              {...register("passwordConfirmation", {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
            />

            {errors?.passwordConfirmation?.type === "required" && (
              <InputErrorMessage>
                A confirmação de senha é obrigatória.
              </InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === "validate" && (
              <InputErrorMessage>
                A confirmação de senha precisa ser igual a senha.
              </InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === "minLength" && (
              <InputErrorMessage>
                A confirmação de senha precisa ter no mínimo 6 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Criar Conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;
