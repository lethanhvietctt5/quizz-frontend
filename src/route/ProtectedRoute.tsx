import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const auth = useAppSelector(state => state.auth);

  if (!auth.email) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
