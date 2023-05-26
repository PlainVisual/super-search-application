import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function MainLayout() {

  const { isAuth } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
    {/* Header only shows when isAuth is true and not equal to pathnames defined true */}
    { isAuth && 
      location.pathname !== "/profile" &&
      location.pathname !== "/signup-step-2" && 
      location.pathname !== "/update-profile-picture" && <Header /> }
    <main className="main-container main-search main-profile">
      <Outlet />
    </main>
    </>
  
  )
}

export default MainLayout;