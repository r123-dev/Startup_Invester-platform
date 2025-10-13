import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Helper to check token validity
const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const valid = token && isTokenValid(token);

  return valid ? children : <Navigate to="/" replace />;
}
