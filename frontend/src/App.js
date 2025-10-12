import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupCompany from "./pages/Company/Signup";
import LoginCompany from "./pages/Company/Login";
import SignupEnthusiast from "./pages/Enthusiast/Signup"
import LoginEnthusiast from "./pages/Enthusiast/Login"
import Mainpage from "./pages/Mainpage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginCompany" element={<LoginCompany />} />
        <Route path="/SignupCompany" element={<SignupCompany  />} />
        <Route path="/SignupEnthusiast" element={<SignupEnthusiast role="Enthusiast" />} />

        <Route path="/LoginEnthusiast" element={<LoginEnthusiast/>}/>
        <Route path="/Mainpage" element={<Mainpage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

