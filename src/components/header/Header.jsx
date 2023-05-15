import React from "react";
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Button from "../buttons/button";


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
            <p>User: { authState.username }</p>
            <p>emailadres: { authState.email }</p>
            <p>Profilepicture: </p>
            <img src={ profilePictureUrl } />
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