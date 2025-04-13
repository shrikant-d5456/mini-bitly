import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user  = localStorage.getItem('token');
  // console.log(user);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;