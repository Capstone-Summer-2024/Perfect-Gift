import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSignup from "./pages/LoginSignup";
import CollectingInfo from "./pages/CollectingInfo";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import MultiStepForm from "./components/MultiStepForm";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/register-login" element={<LoginSignup />} />
          <Route path="/collect-info" element={<MultiStepForm />} />
          <Route path="/gift-items" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
