import React from "react";
import { useNavigate } from "react-router-dom";
import "../../components/buttons/button.css"

function Button({ classAtrribute, btnType, isDisabled, children, goToPage }) {

  const navigate = useNavigate();

  return (

    <>
      <button
        className={ classAtrribute } 
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