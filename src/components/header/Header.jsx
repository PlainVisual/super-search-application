import React from "react";
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Button from "../buttons/button";
import '../../components/header/header.css'


function Header() {

  const { logOutFunction, 
    profilePicture, 
    authState 
  } = useContext(AuthContext);

  const [ profilePictureUrl, 
      setProfilePictureUrl
    ] = useState('');

  useEffect(() => {
  setProfilePictureUrl(profilePicture);
  }, [profilePicture]);

  return (
    <header>
        <nav>
          <div className="headerLogo__ss"></div>
          <ul>
            <li></li>
          </ul>
          <div className="header__account">
            <div className="profile__container">
              <img className="hero__profile" src={ profilePictureUrl } />
            </div>
            <div className="user_profile">
            <p>{ authState.username }</p>
            <p>{ authState.email }</p>
            </div>
            
            <button
      type="button"
      onClick={ logOutFunction }
    >
      Logout
    </button>

    <Button 
      btnType="button"
      goToPage="/profile"
      isDisabled= { false }
    >   
      Profile
    </Button>


          </div>
          <div className="header__favorites"></div>
        </nav>
    </header>
  )
}

export default Header;