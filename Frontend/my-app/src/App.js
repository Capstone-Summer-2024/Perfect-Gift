import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSignup from "./pages/LoginSignup";
import CollectingInfo from "./pages/CollectingInfo";
import Navbar from "./components/NavBar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-login" element={<LoginSignup />} />
        <Route path="/collectinginfo" element={<CollectingInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
