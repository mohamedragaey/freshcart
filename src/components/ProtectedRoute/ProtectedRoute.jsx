import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from '../../Context/UserContext';

export default function ProtectedRoute() {
  const { isUserAuth } = useContext(userContext);

  if (!!isUserAuth) {
    return <Outlet />
  } else {
    return <Navigate to="/login" replace="true" />
  }
}
