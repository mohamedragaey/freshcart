import React, { useContext } from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from "react-router-dom";
import { userContext } from '../../Context/UserContext';

export default function ProtectedRoute(props) {
//==================== way of using localstorage

  // if(localStorage.getItem('userToken') !== null ){
  //   return props.children
  // }
  // else{

  //   return <Navigate to="/login" />
  // }

 // ========== way of using usecontext

 let {userToken} = useContext(userContext);

 if( userToken !== null ){
    return props.children
 }
 else{
    return <Navigate to="/login" />
  }


 
}
