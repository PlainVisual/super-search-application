import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import jwtTokenValid from "../Hooks/tokenExp";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
   // This is the useState to control the isAuth and the userdata
  const [ authState, setAuthState ] = useState({
                                          isAuth: false,
                                          id: null,
                                          profilePicture: null,
                                          status: "pending",
                                        })
  const [token, setToken] = useState(localStorage.getItem("token")); 
  const [storedId, setStoredId] = useState(localStorage.getItem("USER_SELECT_ID") || "");
  const [storedDate, setStoredDate] = useState(localStorage.getItem("dateEnt") || "")
  const [profilePic, setProfilePic] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); 
  
  // We upload the profile picture to the backend server en get the userdata back.  
  
  async function getData(token, imageSrc) {
    setToken(token);
    localStorage.setItem('token', token);
    const imageData = {
            base64Image: imageSrc,
    }
    try {
      // Use Promise.all to make both requests concurrently
      const [imageRes, userRes] = await Promise.all([
        imageSrc &&
         axios.post(
            "https://frontend-educational-backend.herokuapp.com/api/user/image",
            imageData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        axios.get("https://frontend-educational-backend.herokuapp.com/api/user", 
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ),
      ]);

      // console.log(imageRes);

      // Destructure the user data
      const { email, id, username, profilePicture } = userRes.data;
      console.log(userRes.data);
      // Update the authState
      setAuthState({
        ...authState,
        isAuth: true,
        email: email,
        id: id,
        username: username,
        profilePicture: profilePicture,
        status: "done",
      });

      setProfilePic(profilePicture);
      // To prevent using the navigation on page refresh this if/else statement determins where it needs to run.
      if (location.pathname === "/") {
        return; // Don't run the function again if already on homepage
      } else if (location.pathname === "/login" || location.pathname === "/signup-step-2"){
          if (profilePicture) {
            navigate("/");
          } else {            
            navigate("signup-step-2"); 
          }
        } 

       // I made use of useState to store the current date + 30 days that the user can be logged in. Every time he logs in its get a check if the date is expired. After the 30 days he is logged out en the LocalStorage is empty.
      if(!storedDate) {
        const date = new Date().setDate(new Date().getDate() + 30);
        console.log(new Date(date));

        localStorage.setItem("dateEnt", JSON.stringify({
            expDate: date,
        }));
        setStoredDate(localStorage.getItem("dateEnt"))
      } 

      if (storedDate) {
        const res = (new Date()).getTime() > JSON.parse(storedDate).expDate;
        console.log(new Date(res));
        if (res) {
          localStorage.removeItem("dateEnt");
          localStorage.removeItem("USER_SELECT_ID")
          setStoredDate("");
          logOut();
          
        }
      }       
       
    } catch (e) {
      localStorage.removeItem("token");
      console.error(e);
      setAuthState({
        ...authState,
        isAuth: false,
        status: "done",
      });
      if (e.response && e.response.status === 401) {
        navigate("/");
      }
    } 
  }

  // We store the ID form the Hero-picker in localstorage.
  useEffect(() => {
    console.log("stored ID is =>", storedId);
    localStorage.setItem("USER_SELECT_ID", storedId)
    }, [storedId]);

  useEffect(() => {
    console.log('isAuth changed:', authState.isAuth);
  }, [authState.isAuth]);

  useEffect(() => {
    
    // If there is no token we setAuthState to status done to prevent error due to restriction backend.
    if (!token) {
      setAuthState({
        ...authState,
        status: "done",
      });
    // If there a token use token to validate the expire date and use token in getData() to retreive the user data for useState.  
    } else if(token && jwtTokenValid(token)) {
      getData(token);
      
    } else {
    localStorage.removeItem('token');
    setAuthState({
      ...authState,
      isAuth: false,
      status: "done",
    });
  }

  }, []);
  
  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
    setAuthState({  
      ...authState, 
      isAuth: false, 
      email: "", 
      username: "",
      profilePicture: "",
      user: null,  
    });

    navigate("/", { replace: true });
  }


  const authentication = {
    isAuth: authState.isAuth,
    email: authState.email,
    username: authState.username,
    profilePicture: authState.profilePicture,
    logOutFunction: logOut,
    updateDataFunction: getData,
    token: token,
    storedId: storedId,
    setStoredId: setStoredId,
    profilePic: profilePic,
    setProfilePic: setProfilePic,
   }

  return (

    <AuthContext.Provider value={ authentication }>
      { authState.status === 'done' ? children : <p>loading....</p> }
    </AuthContext.Provider>

  )


}


export default AuthContextProvider;