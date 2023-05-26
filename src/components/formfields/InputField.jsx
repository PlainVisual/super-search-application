import React from "react";
import { useState } from "react";
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
            autofocus,
                                 
           } ) {

  const [passwordShown, setPasswordShown] = useState(false);
 
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (

    <>

      <fieldset className={ fieldsetClass }>
        { labelTextTop && <label htmlFor={ nameAttribute }>{ labelTextTop }{ required && "*"}</label> }
        <div className="input-container">
        { icon && <i onClick={togglePasswordVisibility}>{passwordShown ? eye : eyeSlash}</i> } 
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
                  autoFocus= { autofocus }
                  placeholder={ placeHolder}
                  autoComplete={ autoCompleteAttr }
                  { ...register(nameAttribute, validationSchema)}
                  aria-invalid={errors[nameAttribute] ? "true" : "false"} 
                />

         }

         </div>

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