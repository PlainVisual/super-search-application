import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { HeroContentPicker } from '../../Helpers/images';
import Heropicker from '../../components/heropicker/Heropicker';

function SignUpHeroPicker() {

  const { token, 
          updateDataFunction,
          setStoredId,
          setStoredImg 
        } = useContext(AuthContext);
  
  const handleImageClick = (e) => {
    e.preventDefault();
    
    const imageSrc = e.target.getAttribute("data-src")
    const characterID = e.target.getAttribute("data-id")
    const charaterImg = e.target.getAttribute("src")
    
    setStoredId(characterID);
    setStoredImg(charaterImg);
    updateDataFunction(token, `${imageSrc}?${Date.now()}`);
  }

  return (
    <div className="image-container">
    { HeroContentPicker.length === 0 ? (
      <div className="msgError">
        <p>... is Loading</p>
      </div>
    ) : (


      <Heropicker 
      heroes={ HeroContentPicker }
      imageClick={ handleImageClick }
      />
             
    )}
    </div>  
  )
}

export default SignUpHeroPicker;