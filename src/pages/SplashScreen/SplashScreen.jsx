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
      goToPage="/"
      isDisabled= { false }
    >   
      Home
    </Button>

    <Button 
      btnType="button"
      goToPage="/login"
      isDisabled= { false }
    >   
      Login
    </Button>

    <Button 
      btnType="button"
      goToPage="/signup"
      isDisabled= { false }
    >   
      SignUp
    </Button>
  
    </>

  )



}

export default SplashScreen;