import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import sideDetail from "../../assets/hero-side-detail.svg";

function MainLayout() {

  const { isAuth } = useContext(AuthContext);
  const location = useLocation();

  // exclude some pages to not use background color 

  const excludedPaths = ["/profile", "/login", "/thank-you", "/signup",];
  const isExcludedPath = excludedPaths.some((path) => location.pathname.endsWith(path));

  const excludedPathsClip = [ "/", "/search", "/favorites",];
  const isExcludedPathClip = excludedPathsClip.some((path) => location.pathname.endsWith(path));
 
  return (
    <>
      <main className="outer-container main-container main-search main-favorite main-profile main-splash-screen main-home">
        <div
          className={`inner-container ${
            isExcludedPath ? "wrapper-clip-path" : "background-inner"
          } ${isExcludedPathClip ? "" : "wrapper-clip-path"}`}
        >
          {/* Header only shows when isAuth is true and not equal to pathnames defined true */}
          {isAuth &&
            location.pathname !== "/profile" &&
            location.pathname !== "/signup-step-2" &&
            location.pathname !== "/update-profile-picture" && <Header />}
          {/* <div className={`section-wrapper inner-width-section ${
              isExcludedPath ? "" : "element-holder"
            }`}
          >  */}
          <div
            className={`section-wrapper inner-width-section ${
              isExcludedPath ? "" : "element-holder"
            } ${isExcludedPath ? "" : "inner-background-path"}`}
          >
            {!isExcludedPath && (
              <div className={`${isExcludedPath ? "" : "element-side-detail"}`}>
                <img src={sideDetail} alt="" />
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default MainLayout;