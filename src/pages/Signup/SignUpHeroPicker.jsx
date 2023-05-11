import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { HeroContentPicker } from '../../Helpers/images';

function SignUpHeroPicker() {

  const { token, updateDataFunction, setStoredId } = useContext(AuthContext);  
  
  const handleImageClick = (e) => {
    e.preventDefault();
    const imageSrc = e.target.getAttribute("data-src")
    const characterID = e.target.getAttribute("data-id")
    setStoredId(characterID);
    updateDataFunction(token, imageSrc);
  }

  return (
    <div className="image-container">
    { HeroContentPicker.length === 0 ? (
      <div className="msgError">
        <p>Loading...</p>
      </div>
    ) : (
      
        HeroContentPicker.map((heroes) => (
         
            <div key={ heroes.id } className={`image-button ${ heroes.name.replaceAll(' ', '-').toLowerCase() }`} onClick={handleImageClick}>
                <img
                  src={ heroes.placeholder } 
                  data-id={ heroes.id } 
                  data-src={ heroes.profile } 
                  alt={ heroes.name.replaceAll(' ', '-').toLowerCase() } />
            </div>
                
        ))
      
    )}
    </div>  
  )
}

export default SignUpHeroPicker;