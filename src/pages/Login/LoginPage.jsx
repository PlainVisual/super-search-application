import React from "react";
import InputField from "../../components/formfields/InputField";
import Button from "../../components/buttons/button";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { checkServer } from "../../Helpers/checkServer";
import { ReactComponent as Logo } from "../../assets/logo-super-search.svg";
import watcher from "../../assets/images/theWatcher.jpg";
import "../Login/login.css"

function LoginPage() {

  const { updateDataFunction } = useContext(AuthContext);
  const [ errorMsg, 
          setErrorMsg
        ] = useState("");  

  const { register, 
          handleSubmit, 
          formState: { errors }, 
          reset } = useForm({
                        mode: "onBlur",
                      });

  // Check if the server is running. see src/Helpers
  useEffect(() => {
    checkServer();
  }, [])

  useEffect(() => {
    document.title = "Login to your account"
  }, []);
  
   async function LogInUser(data, e) {

    e.preventDefault();

    const serverIsRunning = await checkServer();
    if (!serverIsRunning) {
      setErrorMsg('Server is not responding');
      return;
    }

    try{
      const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
        username: data.username,
        password: data.password,
      });
      // console.log("result login", res.data);
      // console.log("result login", res.data.id);

      const Accestoken = res.data.accessToken;
          
      updateDataFunction(Accestoken);
      

    }catch(e) {
      // console.log(e.response.data.message);
      // console.error(e);
      if (!e?.response) {
        setErrorMsg("No server connection");
      } else if (e.response?.status === 401) {
        setErrorMsg("Username or Password not found");
      } else {
        setErrorMsg("creating account failed please try again later");
      }
    }

    reset();
      
  };

  return (

      <section className="login-content">
      <div className="left_column" style={{ "--background-signup": `url(${watcher})` }}>
        <h1>Get Ready to Save the World with SuperSearch</h1>
      </div>
      <div className="right_column">
      <div className="form-content">
      <div className="login-logo">
              <Logo />
            </div>
        
        <form onSubmit={handleSubmit(LogInUser)}>
        {errorMsg && <span className='error__msg'>{ errorMsg }</span>}
          <InputField
            typeAttribute="text"
            nameAttribute="username"
            autoCompleteAttr="username"
            placeHolder="Username"
            // labelTextTop="Fill in your username"
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
            typeAttribute="password"
            nameAttribute="password"
            autoCompleteAttr="new-password"
            placeHolder="Password"
            // labelTextTop="Fill in your Password"
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
         
         <Button 
              classAtrribute="primary-btn-white"
              btnType="submit"
              isDisabled= { false }
         >   
              LogIn
             
         </Button>
         <p>Don't have a account? <Link to="/signup">Signup</Link> first to gain acces.</p>
        </form>

        
        </div>       
      </div>
    </section>        


  )

}

export default LoginPage;