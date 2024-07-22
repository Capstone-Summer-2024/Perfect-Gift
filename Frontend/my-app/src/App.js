import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSignup from "./pages/LoginSignup";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import MultiStepForm from "./components/MultiStepForm";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userUid, setUserUid] = useState(null);

  const handleAuthChange = (uid) => {
    setUserUid(uid);
  };

  return (
    <Router>
      <Navbar userUid={userUid} />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register-login" element={<LoginSignup onAuthChange={handleAuthChange} />} />
          <Route path="/collect-info" element={<MultiStepForm />} />
          <Route path="/gift-items" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
