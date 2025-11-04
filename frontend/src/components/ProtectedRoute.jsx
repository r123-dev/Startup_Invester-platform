import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsValid(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setIsValid(true);
      } else {
        localStorage.removeItem("authToken");
        setIsValid(false);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setIsValid(false);
    }
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>; // ⏳ Prevents redirect flash
  }

  return isValid ?  children: <Navigate to="/" replace />;
}
