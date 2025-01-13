import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./contexts/user.context";
import { collection, getDocs, query, where } from "firebase/firestore";

// Pages
import HomePage from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";
import SignUpPage from "./pages/SignUp/SignUp.page";

// Utilities
import { auth, db } from "./config/firebase.config";
import { useContext } from "react";

const App = () => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSigninOut = isAuthenticated && !user;
    if (isSigninOut) {
      return logoutUser();
    }

    const isSigninIn = !isAuthenticated && user;
    if (isSigninIn) {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );

      const userFromFirestore = querySnapshot.docs[0]?.data();

      return loginUser(userFromFirestore as any);
    }
  });

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
