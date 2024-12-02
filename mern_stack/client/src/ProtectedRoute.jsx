import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if(!isAuthenticated){
    return isAuthenticated ? children : <Navigate to="/admin" />;
  }
  return children;
};

export default ProtectedRoute;
