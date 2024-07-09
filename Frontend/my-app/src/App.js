import React from "react";
import CollectingInfo from "./pages/CollectingInfo";
import LoginSignup from "./pages/LoginSignup";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";

import SignupForm from "./components/MultiStepForm";

function App() {
  return (
    <div className="App">
      {/* <CollectingInfo /> */}
      <Navbar />
      {/* <LoginSignup /> */}

      {/* <HomePage /> */}
      <SignupForm />
    </div>
  );
}

export default App;
