import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import SignUp from "./pages/Signup/SignUp";
import SignUpHeroPicker from "./pages/Signup/SignUpHeroPicker";
import LoginPage from "./pages/Login/LoginPage";
import Home from "./pages/Home/Home";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileUpdateHeroPicker from "./pages/Profile/ProfileUpdateHeroPicker"
import ThankyouPage from "./pages/ThankYou/ThankyouPage";
import NotFoundPage from "./pages/404/NotFoundPage";
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from "./Context/AuthContext";
import { useContext } from 'react';
import "./App.css";

function App() {

  const { isAuth } = useContext(AuthContext);

  return (
    
      <Routes>
        {/* Openbare pagina's */}
        { !isAuth && <Route path="/" element={ <Navigate to="welcome-to-SuperSearch" replace /> } />}
        { !isAuth && <Route path="/Welcome-to-SuperSearch" element={ <SplashScreen /> } /> }
        <Route path="/signup" element={ <SignUp /> } />
        <Route path="/signup-step-2" element={ <SignUpHeroPicker /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/thank-you" element={ <ThankyouPage /> } />
        {/* Beveiligde pagina's */}
        <Route element={<PrivateRoute />}>
            <Route path="/" element={ <Home /> } />
            <Route path="/favorites" element={ <FavoritesPage /> } />
            <Route path="/profile" element={ <ProfilePage /> } />
            <Route path="/update-profile-picture" element={ <ProfileUpdateHeroPicker /> } />
        </Route>
        {/* Alle overige pagina's 404 */}
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
  );
}

export default App;
