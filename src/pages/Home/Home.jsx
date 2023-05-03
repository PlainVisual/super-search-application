import React from "react";
import Button from '../../components/buttons/button';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';

function Home() {

  const { logOutFunction } = useContext(AuthContext);

  return (
    <>
    <div>Home</div>

    <Button 
      btnType="button"
      goToPage="/favorites"
      isDisabled= { false }
    >   
      Favorites
    </Button>

    <Button 
      btnType="button"
      goToPage="/home"
      isDisabled= { false }
    >   
      Home
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
