import React from "react";
import Button from '../../components/buttons/button';
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';

function Home() {

  const { logOutFunction, storedId, profilePicture, profilePic } = useContext(AuthContext);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  
  useEffect(() => {
    setProfilePictureUrl(profilePicture);
  }, [profilePicture]);

  return (
    <>
    <div>Home</div>
    <p>SelectedId: { storedId }</p>
    <p>Profilepicture: </p>
    <img src={ profilePictureUrl } />
    <img src={ profilePic } />

    <Button 
      btnType="button"
      goToPage="/"
      isDisabled= { false }
    >   
      Home
    </Button>

    <Button 
      btnType="button"
      goToPage="/favorites"
      isDisabled= { false }
    >   
      Favorites
    </Button>

    <Button 
      btnType="button"
      goToPage="/profile"
      isDisabled= { false }
    >   
      Profile
    </Button>

    <button
      type="button"
      onClick={ logOutFunction }
    >
      Logout
    </button>
    </>

    
  );
}

export default Home;
