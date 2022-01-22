import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

// handle the private routes
function PrivateRoute({ children }) {
  const { token } = useUser();
  return token ? children : <Navigate to={{ pathname: '/login' }} />;
}

export default PrivateRoute;
