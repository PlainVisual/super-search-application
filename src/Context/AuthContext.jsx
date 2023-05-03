import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

  const [ authState, setAuthState ] = useState({
                                          isAuth: false,
                                          email: "",
                                          username: "",
                                          id: null,
                                        })

  useEffect(() => {
    console.log('isAuth changed:', authState.isAuth);
  }, [authState.isAuth]);

  const navigate = useNavigate();

  async function logIn(token) {
    
      // localStorage gebruiken wij om de gegeven token in de browser op te slaan.
      localStorage.setItem('token', token);
      //  Wij ontcijferen de token met behulp van jwt_decode
      const decoded = jwt_decode(token);
      // Hierdoor hebben wij toegang tot de ID van de user
      console.log(decoded.sub);

      try {  

      // Via axios.get roepen wij gegevens van de user op. Dit in combinatie met de token waaraan de user wordt herkend 
      const res = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ token }`,
        },

        });

        console.log(res)
      
      // Via destructering halen we de keys op vanuit het object res.data
      const { email, id, username } = res.data;
      // Nu kunnen we een copy van de authState maken via ...spreadoperator 
      setAuthState( prevState => ({
        
        ...prevState, 
        isAuth: true, 
        email: email, 
        id: id, 
        username: username, }));
      
      navigate("/signup-step-2");

      } catch(e) {
        console.error(e);
      }

  }

  function logOut() {
    localStorage.removeItem('token');
    setAuthState({  ...authState, isAuth: false, email: "", username: "", user: null,  });
    navigate("/thank-you")
  }


  const authentication = {
    isAuth: authState.isAuth,
    email: authState.email,
    username: authState.username,
    logInFunction: logIn,
    logOutFunction: logOut,
  }

  return (

    <AuthContext.Provider value={ authentication }>
      { children }
    </AuthContext.Provider>

  )


}


export default AuthContextProvider;