import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
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

  const navigate = useNavigate();
  
  async function handleImageClick(e) {
    e.preventDefault();
    
    const imageSrc = e.target.getAttribute("data-src");
    const characterID = e.target.getAttribute("data-id");
    const characterIMG = e.target.getAttribute("src");
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