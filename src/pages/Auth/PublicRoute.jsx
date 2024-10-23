import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
  const userId = localStorage.getItem('userId');

  if (userId) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
