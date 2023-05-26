import React from 'react';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HeroContentPicker } from '../../Helpers/images';
import Heropicker from '../../components/heropicker/Heropicker';
import '../Profile/profile.css';

function ProfileUpdateHeroPicker() {

  const { token, 
          setStoredId,
          setStoredImg, 
          authState, 
          updateAuthState 
        } = useContext(AuthContext);

        useEffect(() => {
          document.title = "Update your profile picture"
        }, []);      

  const navigate = useNavigate();
  
  async function handleImageClick(e) {
    e.preventDefault();
    
    const imageSrc = e.currentTarget.querySelector('img').getAttribute('data-src');
    const characterID = e.currentTarget.querySelector('img').getAttribute('data-id');
    const characterIMG = e.currentTarget.querySelector('img').getAttribute('src');
    setStoredId(characterID);
    setStoredImg(characterIMG);

    const imageData = {
      base64Image: imageSrc,
    }

    try {
    
    const res = await axios.put(
      "https://frontend-educational-backend.herokuapp.com/api/user/",
      imageData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("result updateProfile", res.data);
      
      updateAuthState({
        ...authState,
        profilePicture: res.data.profilePicture,
      });

      navigate(-2)

   
  } catch(e) {
      console.error(e);
    }
  }

  return (
    
    <div className="hero-image-container">
      <div className="hero-picker-content">
        <div className="picker-cta-text">
            <h1>Change your profile picture</h1>
        </div>
        <div className="picker-slide">
          
        </div>
        
      </div>
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

export default ProfileUpdateHeroPicker;    