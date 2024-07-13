import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CollectingInfo from "./pages/CollectingInfo";
import LoginSignup from "./pages/LoginSignup";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";

import MultiStepForm from "./components/MultiStepForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/collect-info" element={<MultiStepForm />} />
            <Route path="/gift-items" element={<ProductList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
