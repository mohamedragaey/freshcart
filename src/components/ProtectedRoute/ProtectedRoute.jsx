import React from 'react'
import { Navigate } from "react-router-dom";
import CookiesStorageService from '../../services/CookiesStorageService';

const StorageService = CookiesStorageService.getService()
const token = StorageService.getAccessToken()

export default function ProtectedRoute(props) {
  return !!token ? props.children : <Navigate to="/login" />
}
