import React from "react";
import InputField from "../../components/formfields/InputField";
import Button from "../../components/buttons/button";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState } from "react";
import { faEye } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {

  const { profilePicture, 
          username, 
          authState, 
          updateAuthState,
          logOutFunction, 
          token } = useContext(AuthContext);

  const [ errorMsg, 
          setErrorMsg
        ] = useState("");  

  const [ succesMsg, 
          setSuccesMsg
        ] = useState("");      

  const { register, 
          handleSubmit, 
          formState: { errors }, 
          watch, 
          reset } = useForm({
                      mode: "onBlur",
                      });

  async function updateUser(data, e) {

    e.preventDefault();

    try{
      if(data.email) {
      const res = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
        email: data.email,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("result login", res.data);   
         
      updateAuthState({
        ...authState,
        email: res.data.email,
      }
      );

    } else if(data.password) {
      const res = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
        password: data.password,
        repeatedPassword: data.repeatedPassword,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("result login", res.data);

      setSuccesMsg("Succes! You will be redirected to the login page after 15s or do it yourself");

      setTimeout(() => {
        logOutFunction();
      }, 15000)

    }

    }catch(e) {
      console.log(e.response.data.message);
      console.error(e);
      if (!e?.response) {
        setErrorMsg("No server connection");
      } else if (e.response?.status === 401) {
        setErrorMsg("Username or Password not found. Signup for a new account to acces");
      } else {
        setErrorMsg("creating account failed please try again later");
      }
    }

    reset();
    
      
  };  

  return (

    <>
    <section className="left_column"></section>
    <section className="right_column">
      <div className="user_profilePic"><img src={ profilePicture } alt="" /></div>
      <Link to="/update-profile-picture">Change profile picture</Link>
      <p className="user_name">{ username }</p>
      <p className="user_email">{ authState.email }</p>
      {errorMsg && <span className='error__msg'>{ errorMsg }</span>}
      <form onSubmit={handleSubmit(updateUser)}>
         
         <InputField
            typeAttribute="text"
            nameAttribute="email"
            autoCompleteAttr="email"
            placeHolder="Email"
            labelTextTop="Change Email"
            errors={ errors }
            register={ register }
            validationSchema={{
              required: {
                value: false,
                message: "This should be a valid emailadress",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "This should be a valid email address",
              },              
              validate: (value) => {
                if (value > 0) {
                return value.includes('@') || "Emailadress should include a @"
                }
              }
              
            }}
            // required
          />

        <InputField
          typeAttribute="password"
          nameAttribute="password"
          autoCompleteAttr="new-password"
          placeHolder="Password"
          labelTextTop="Change Password"
          errors={ errors }
          register={ register }
          validationSchema={{
            required: {
              value: false,
              message: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            maxLength: {
              value: 20,
              message: "Password not longer then 20 characters",
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message: "Use at least 1 letter, 1 number or a special character",
            },
                          
          }}
          // required
          icon={faEye}
          
        />

        <InputField
          typeAttribute="password"
          nameAttribute="repeatedPassword"
          autoCompleteAttr="new-password"
          placeHolder="Confirm Password"
          labelTextTop="Confirm Password"
          errors={ errors }
          register={ register }
          validationSchema={{
            required: {
              value: false,
              message: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            maxLength: {
              value: 20,
              message: "Password not longer then 20 characters",
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/, 
              message: "Use at least 1 letter, 1 number or a special character",
            },
            validate: (val) => {
              if (watch("password") != val) {
                return "Your password do not match";
              }
            },
                          
          }}
          // required
          icon={faEye}
        />
       {succesMsg ? (
            <div className="succes">
            <span className='succes__msg'>{ succesMsg }</span>
            <button 
            type="button"
            onClick={ logOutFunction }
            
       >   
            Logout
           
            </button>
            </div>
        ) : (
        <Button 
            btnType="submit"
            isDisabled= { false }
       >   
            Update
           
       </Button>
       )}
       
       
      </form>
      
      <Button 
      btnType="button"
      goToPage="/"
      isDisabled= { false }
    >   
      Home
    </Button>

    </section>

  </> 
  )
}

export default ProfilePage;
