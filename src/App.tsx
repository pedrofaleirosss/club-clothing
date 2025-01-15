import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useState } from "react";

// Pages
import HomePage from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";
import SignUpPage from "./pages/SignUp/SignUp.page";

// Utilities
import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/user.context";
import { userConverter } from "./converters/firestore.converters";
import Loading from "./components/Loading/Loading.component";

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSigninOut = isAuthenticated && !user;
    if (isSigninOut) {
      logoutUser();
      return setIsInitializing(false);
    }

    const isSigninIn = !isAuthenticated && user;
    if (isSigninIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid)
        )
      );

      const userFromFirestore = querySnapshot.docs[0]?.data();

      loginUser(userFromFirestore);

      return setIsInitializing(false);
    }

    return setIsInitializing(false);
  });

  if (isInitializing) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
