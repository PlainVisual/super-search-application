import React from "react";
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, Link } from "react-router-dom";
import '../../components/header/header.css'
import { ReactComponent as Logo } from "../../assets/logo-super-search.svg";
import { ReactComponent as FavoriteLogo } from "../../assets/icon-favorite.svg";
import MicroDropdown from "../microdropdown/microdropdown";
import FavouritesSlideIn from "../favouritesslidein/FavouritesSlideIn";


function Header() {

  const { profilePicture, 
          authState } = useContext(AuthContext);

  const [profilePictureUrl, 
         setProfilePictureUrl] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [favIsOpen, setFavIsOpen] = useState(false);
  const menuRef = useRef();
  const favRef = useRef();
  

  useEffect(() => {
    const handler = (e) => {
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setIsOpen(false)
      }
    };  
    document.addEventListener("mousedown", handler)

    return() => {
      document.removeEventListener("mousedown", handler)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      if(favRef.current && !favRef.current.contains(e.target)){
        setFavIsOpen(false)
      }
    };  
    document.addEventListener("mousedown", handler)

    return() => {
      document.removeEventListener("mousedown", handler)
    }
  }, [favIsOpen])

  
  useEffect(() => {
  setProfilePictureUrl(profilePicture);
  }, [profilePicture]);

  return (
    <header>
      <nav>
        <div className="nav-left">
          <div className="headerLogo__ss">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul>
            <NavLink to="/favorites">favorites</NavLink>
            <NavLink to="/search">Search for heroes</NavLink>
          </ul>
        </div>
        <div className="nav-right">
              <div className="header__account" ref={ menuRef }>
                <MicroDropdown isOpen={ isOpen }/>
                <div className="micro-trigger-user"  onClick={() => setIsOpen(!isOpen)}>
                    <div className="profile__container">
                      <img className="hero__profile" src={profilePictureUrl} />
                    </div>
                    <div className="user_profile">
                      <p>{authState.username}</p>
                      {/* <p>{authState.email}</p> */}
                    </div>
                    
                </div>
          </div>
          <div className="header__favorites" ref={ favRef }>
            <FavouritesSlideIn favIsOpen={ favIsOpen } setFavIsOpen={ setFavIsOpen } />            
              <div className="macro-trigger-fav" onClick={() => setFavIsOpen(!favIsOpen)}>              
                  <FavoriteLogo />                  
                </div>
            </div>
          </div>
        
      </nav>
    </header>
  );
}

export default Header;