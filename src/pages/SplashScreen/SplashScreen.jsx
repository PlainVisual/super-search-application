import React from 'react'
import Button from '../../components/buttons/button';


function  SplashScreen() {

  return (
    <>
    <div>SplashScreen</div>

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
  
    </>

  )



}

export default SplashScreen;