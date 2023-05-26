import React from 'react'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { HeroContentPicker } from '../../Helpers/images';
import Heropicker from '../../components/heropicker/Heropicker';

function SignUpHeroPicker() {

  const { token, 
          updateDataFunction,
          setStoredId,
          setStoredImg 
        } = useContext(AuthContext);

  useEffect(() => {
    document.title = "To complete your profile choose a hero"
  }, []);      
  
  const handleImageClick = (e) => {
    e.preventDefault();
    
    const imageSrc = e.currentTarget.querySelector('img').getAttribute('data-src');
    const characterID = e.currentTarget.querySelector('img').getAttribute('data-id');
    const charaterImg = e.currentTarget.querySelector('img').getAttribute('src');
    
    setStoredId(characterID);
    setStoredImg(charaterImg);
    updateDataFunction(token, `${imageSrc}?${Date.now()}`);
  }

  return (
    <div className="hero-image-container">
      <div className="hero-picker-content">
        <div className="picker-cta-text">
          <h1>Add your favorite hero to your profile</h1>
        </div>
        <div className="picker-slide"></div>
      </div>
      {HeroContentPicker.length === 0 ? (
        <div className="msgError">
          <p>... is Loading</p>
        </div>
      ) : (
        <Heropicker heroes={HeroContentPicker} imageClick={handleImageClick} />
      )}
    </div>
  );
}

export default SignUpHeroPicker;