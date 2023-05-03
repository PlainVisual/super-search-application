import React from "react";
import { useState } from "react";
import "../formfields/inputField.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = < FontAwesomeIcon icon={faEye} />;
const eyeSlash = < FontAwesomeIcon icon={faEyeSlash} />;

function InputField({ 
            fieldsetClass,
            nameAttribute,
            typeAttribute,
            autoCompleteAttr, 
            labelTextTop,
            labelTextBottom,
            placeHolder,
            msgCols,
            msgRows,
            register,
            errors,
            required,
            validationSchema,
            icon,
                       
           } ) {

  const [passwordShown, setPasswordShown] = useState(false);

  return (

    <>

      <fieldset className={ fieldsetClass }>
        { labelTextTop && <label htmlFor={ nameAttribute }>{ labelTextTop }{ required && "*"}</label> }
        { typeAttribute === "message" ? 

                <textarea 
                type={ typeAttribute } 
                id={ nameAttribute } 
                name={ nameAttribute }
                placeholder={ placeHolder }
                cols={ msgCols }
                rows={ msgRows }
                { ...register(nameAttribute, validationSchema)}
                aria-invalid={errors[nameAttribute] ? "true" : "false"} 
                ></textarea>
                

                    :

                <input 
                  type={passwordShown ? "text" : typeAttribute} 
                  id={ nameAttribute } 
                  name={ nameAttribute }
                  placeholder={ placeHolder}
                  autoComplete={ autoCompleteAttr }
                  { ...register(nameAttribute, validationSchema)}
                  aria-invalid={errors[nameAttribute] ? "true" : "false"} 
                />

         }

         
        { icon && <i onClick={()=>setPasswordShown(!passwordShown)}>{passwordShown ? eye : eyeSlash}</i> } 

        { errors && errors[nameAttribute]?.type === "required" && (
          <span role="alert" className="error">{ errors[nameAttribute]?.message}</span>
        )} 

        { errors && errors[nameAttribute]?.type === "minLength" && (
          <span role="alert" className="error">{ errors[nameAttribute]?.message}</span>
        )} 

        { errors && errors[nameAttribute]?.type === "maxLength" && (
          <span role="alert" className="error">{ errors[nameAttribute]?.message}</span>
        )}

        { errors && errors[nameAttribute]?.type === "validate" && (
          <span role="alert" className="error">{ errors[nameAttribute]?.message}</span>
        )} 

        { errors && errors[nameAttribute]?.type === "pattern" && (
          <span role="alert" className="error">{ errors[nameAttribute]?.message}</span>
        )}

        { labelTextBottom && <label htmlFor={ nameAttribute }>{ labelTextBottom }</label> }

        
        
      </fieldset>
  
    
    </>


  )

}


export default InputField;