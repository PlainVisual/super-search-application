import React from "react";
import Button from '../../components/buttons/button';
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';

function Home() {

  const { storedId,
          storedImg, 
        } = useContext(AuthContext);

  const [ charaterPicture, 
          setCharacterPicture
        ] = useState('');
  
  useEffect(() => {
    setCharacterPicture(storedImg);
  }, [storedImg]);

  return (
    <>
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
      goToPage="/search"
      isDisabled= { false }
    >   
      Search for Heroes
    </Button>

    <div>Home</div>
    <p>SelectedId: { storedId }</p>
    <p>Profilepicture: </p>
    <img src={ charaterPicture } />

   </>

    
  );
}

export default Home;
