import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ btnType, isDisabled, children, goToPage }) {

  const navigate = useNavigate();

  return (

    <>
      <button 
        type= { btnType }
        disabled= { isDisabled }
        onClick= {() => { navigate(goToPage)}}
      >                  
       { children} 
      </button>
    </>

  );

}

export default Button;