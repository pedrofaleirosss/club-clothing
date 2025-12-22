import { FiLogOut } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Components
import Header from "../../components/header/header.component";
import Footer from "../../components/footer/footer.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ConfirmationModal from "../../components/confirmation-modal/confirmation-modal.component";

// Styles
import {
  AccountContainer,
  AccountContent,
  AccountHeadline,
  Avatar,
  UserInfo,
  InfoItem,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalActions,
} from "./account.styles";
import Colors from "../../theme/theme.colors";

// Utils
import { auth, db, googleProvider } from "../../config/firebase.config";
import { useAppSelector } from "../../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/toolkit/user/user.slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/custom-input/custom-input.component";
import InputErrorMessage from "../../components/input-error-message/input-error-message.component";

interface DeleteAccountForm {
  password: string;
}

const AccountPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteGoogleModal, setShowDeleteGoogleModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.userReducer);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DeleteAccountForm>();

  if (!currentUser) return null;

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`;

  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
    navigate("/login");
  };

  const handleDeleteAccountWithGoogle = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      if (currentUser.provider === "google") {
        await reauthenticateWithPopup(user, googleProvider);
      }

      const usersQuery = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );

      const userDoc = usersQuery.docs[0];
      if (userDoc) {
        await deleteDoc(doc(db, "users", userDoc.id));
      }

      await deleteUser(user);

      dispatch(logoutUser());

      navigate("/login");
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        alert("Por segurança, faça login novamente e tente de novo.");
      } else {
        console.error(error);
        alert("Erro ao excluir conta. Tente novamente.");
      }
    }
  };

  const handleDeleteAccountWithPassword = async ({
    password,
  }: DeleteAccountForm) => {
    try {
      setIsDeleting(true);

      const user = auth.currentUser;
      if (!user || !user.email) return;

      const credential = EmailAuthProvider.credential(user.email, password);

      await reauthenticateWithCredential(user, credential);

      const usersQuery = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );

      const userDoc = usersQuery.docs[0];
      if (userDoc) {
        await deleteDoc(userDoc.ref);
      }

      await deleteUser(user);

      dispatch(logoutUser());

      setShowDeleteModal(false);

      navigate("/login");
    } catch (error: any) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setError("password", { type: "invalidPassword" });
      } else if (error.code === "auth/requires-recent-login") {
        setError("password", { type: "requiresRecentLogin" });
      } else {
        setError("password", { type: "unknown" });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAccount = () => {
    if (currentUser.provider === "google") {
      setShowDeleteGoogleModal(true);
    } else {
      setShowDeleteModal(true);
    }
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
            onClick={() => setShowSignOutModal(true)}
          >
            Sair da Conta
          </CustomButton>

          <CustomButton
            startIcon={<MdDeleteForever size={18} />}
            onClick={handleDeleteAccount}
            style={{
              marginTop: 12,
              backgroundColor: Colors.error,
            }}
          >
            Excluir Conta
          </CustomButton>
        </AccountContent>
      </AccountContainer>

      <Footer />

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent
            as="form"
            onSubmit={handleSubmit(handleDeleteAccountWithPassword)}
          >
            <ModalTitle>Excluir conta</ModalTitle>

            <ModalDescription>
              Para confirmar a exclusão da sua conta, digite sua senha.
              <br />
              <strong>Essa ação não pode ser desfeita.</strong>
            </ModalDescription>

            {/* Campo oculto para acessibilidade / autofill */}
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={currentUser.email}
              readOnly
              hidden
            />

            <CustomInput
              hasError={!!errors?.password}
              type="password"
              placeholder="Digite sua senha"
              autoFocus
              autoComplete="current-password"
              {...register("password", {
                required: true,
              })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === "invalidPassword" && (
              <InputErrorMessage>Senha incorreta.</InputErrorMessage>
            )}

            {errors?.password?.type === "requiresRecentLogin" && (
              <InputErrorMessage>
                Faça login novamente e tente de novo.
              </InputErrorMessage>
            )}

            {errors?.password?.type === "unknown" && (
              <InputErrorMessage>
                Erro ao excluir conta. Tente novamente.
              </InputErrorMessage>
            )}

            <ModalActions>
              <CustomButton
                onClick={() => setShowDeleteModal(false)}
                type="button"
              >
                Cancelar
              </CustomButton>

              <CustomButton
                disabled={isDeleting}
                style={{ backgroundColor: Colors.error }}
                type="submit"
              >
                {isDeleting ? "Excluindo..." : "Excluir conta"}
              </CustomButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      <ConfirmationModal
        isOpen={showDeleteGoogleModal}
        title="Excluir conta"
        description="Essa ação é permanente e não pode ser desfeita."
        confirmText="Excluir conta"
        isLoading={isDeleting}
        onConfirm={handleDeleteAccountWithGoogle}
        onCancel={() => {
          setShowDeleteGoogleModal(false);
          return;
        }}
      />

      <ConfirmationModal
        isOpen={showSignOutModal}
        title="Sair da conta"
        description="Tem certeza de que deseja sair da sua conta?"
        confirmText="Sair"
        onConfirm={handleLogout}
        onCancel={() => setShowSignOutModal(false)}
      />
    </>
  );
};

export default AccountPage;
