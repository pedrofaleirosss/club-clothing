import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";
import SignUpPage from "./pages/SignUp/SignUp.page";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.config";

const App = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
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
