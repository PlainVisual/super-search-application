import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

const PrivateRoute = () => {
    
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  
  return (    
    isAuth 
    
      ? <Outlet /> 
      : <Navigate to="/login"  state={{ from: location }} replace />
    );
    

};

export default PrivateRoute;