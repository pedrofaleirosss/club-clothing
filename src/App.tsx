import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/Home.page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
