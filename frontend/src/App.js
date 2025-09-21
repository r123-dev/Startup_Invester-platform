import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const LoginPage = ({ role }) => (
  <div style={{ textAlign: "center", marginTop: "100px" }}>
    <h2>Login / Signup as {role}</h2>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-investor" element={<LoginPage role="Investor" />} />
        <Route path="/login-founder" element={<LoginPage role="Founder" />} />
        <Route path="/login-enthusiast" element={<LoginPage role="Enthusiast" />} />
      </Routes>
    </Router>
  );
}

export default App;

