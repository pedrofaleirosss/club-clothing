import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../components/header/header.component";
import Loading from "../components/loading/loading.component";

// Utilities
import { UserContext } from "../contexts/user.context";

interface AuthenticationProps {
  children: ReactNode;
}

const AuthenticationGuard = ({ children }: AuthenticationProps) => {
  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="Você precisa estar logado para acessar esta página. Você será recirecionado para o login em instantes."></Loading>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
