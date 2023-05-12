import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../../components/formfields/InputField';
import Button from '../../components/buttons/button';
import "../Signup/signup.css"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { checkServer } from '../../Helpers/checkServer';


function SignUp() {
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidated) {
      // console.log('Form is validated!');
      navigate("/login");
    }
  }, [isValidated]);
  
  const { register, handleSubmit, formState: { errors }, watch, reset} = useForm({
    mode: "onBlur",
  });

  // Check if the server is running. see src/Helpers
  checkServer();

  async function PostNewUser(data, e) {

    e.preventDefault();

    const serverIsRunning = await checkServer();
    if (!serverIsRunning) {
      setErrorMsg('Server is not responding');
      return;
    }    
    
    try{
      const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
        role: ["user"],
      });
      console.log(res.data);
      setIsValidated(true);

    }catch(e) {
      console.log(e.response.data.message);
      console.error(e);
      if (!e?.response) {
        setErrorMsg("No server connection");
      } else if (e.response?.status === 400) {
        setErrorMsg(e.response.data.message);
      } else if (e.response?.status === 401) {
        setErrorMsg(e.response.data.message);
      } else {
        setErrorMsg("creating account failed please try again later");
      }
    }

    reset();
      
  };

  return (

    <main>
      <section className="left_column"></section>
      <section className="right_column">
        {errorMsg && <span className='error__msg'>{ errorMsg }</span>}
        <form onSubmit={handleSubmit(PostNewUser)}>
          <InputField
            typeAttribute="text"
            nameAttribute="username"
            autoCompleteAttr="username"
            placeHolder="Username"
            labelTextTop="Fill in your username"
            errors={ errors }
            register={ register }
            validationSchema={{
              required: {
                value: true,
                message: "Username should be 3-16 characters and shouldn't include any special character!",
              },
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 16,
                message: "Username not longer then 16 characters",
              },
              pattern: {
                value: /^[A-Za-z0-9]{3,16}$/,
                message: "Don't use a special character",
              },
                            
            }}
            required
          />

          <InputField
            typeAttribute="text"
            nameAttribute="email"
            autoCompleteAttr="email"
            placeHolder="Email"
            labelTextTop="Fill in your Email"
            errors={ errors }
            register={ register }
            validationSchema={{
              required: {
                value: true,
                message: "This should be a valid emailadress",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "This should be a valid email address",
              },              
              validate: (value) => value.includes('@') || "Emailadress should include a @"
              
            }}
            required
          />

          <InputField
            typeAttribute="password"
            nameAttribute="password"
            autoCompleteAttr="new-password"
            placeHolder="Password"
            labelTextTop="Fill in your Password"
            errors={ errors }
            register={ register }
            validationSchema={{
              required: {
                value: true,
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
            required
            icon={faEye}
            
          />

          <InputField
            typeAttribute="password"
            nameAttribute="password-repeat"
            autoCompleteAttr="new-password"
            placeHolder="Confirm Password"
            labelTextTop="Fill in your Password"
            errors={ errors }
            register={ register }
            validationSchema={{
              required: {
                value: true,
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
            required
            icon={faEye}
          />
         
         <Button 
              btnType="submit"
              isDisabled= { false }
         >   
              SignUp
             
         </Button>
         <Button 
              btnType="button"
              goToPage="/login"
              isDisabled= { false }
         >   
              SignIn
             
         </Button>
        </form>

      </section>

    </main>  
    
  )

}

export default SignUp;