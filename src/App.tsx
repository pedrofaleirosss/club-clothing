import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Pages
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/sign-up/sign-up.page";
import ExplorePage from "./pages/explore/explore.page";
import CategoryDetailsPage from "./pages/category-details/category-details.page";
import CheckoutPage from "./pages/checkout/checkout.page";
import PaymentConfirmationPage from "./pages/payment-confirmation/payment-confirmation.page";

// Utilities
import { auth, db } from "./config/firebase.config";
import { userConverter } from "./converters/firestore.converters";
import { loginUser, logoutUser } from "./store/toolkit/user/user.slice";
import { AppDispatch } from "./store/store";
import { useAppSelector } from "./hooks/redux.hooks";

// Components
import Loading from "./components/loading/loading.component";
import Cart from "./components/cart/cart.component";
import AuthenticationGuard from "./guards/authentication.guard";

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigninOut = isAuthenticated && !user;
      if (isSigninOut) {
        dispatch(logoutUser());
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

        dispatch(loginUser(userFromFirestore));

        return setIsInitializing(false);
      }

      return setIsInitializing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isInitializing) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
        <Route
          path="/checkout"
          element={
            <AuthenticationGuard>
              <CheckoutPage />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/payment-confirmation"
          element={<PaymentConfirmationPage />}
        />
      </Routes>

      <Cart />
    </BrowserRouter>
  );
};

export default App;
