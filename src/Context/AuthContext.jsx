import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import jwtTokenValid from "../Hooks/tokenExp";
import logoSupersearch from "../assets/logo-super-search-diap.svg"

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
  const [storedImg, setStoredImg] = useState(localStorage.getItem("USER_SELECT_IMG") || "");
  const [storedDate, setStoredDate] = useState(localStorage.getItem("dateEnt") || "")
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, 3000);
  
    return () => {
      clearTimeout(timeout);
    };
  }, [authState.status]);
  
   // We upload the profile picture to the backend server en get the userdata back.  
  
  async function getData(token, imageSrc) {
    setToken(token);
    localStorage.setItem('token', token);
    const imageData = {
            base64Image: imageSrc,
    }
    try {
      if (imageSrc) {
        const imageRes = await axios.post(
          "https://frontend-educational-backend.herokuapp.com/api/user/image",
          imageData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
      }
  
      const userRes = await axios.get(
        "https://frontend-educational-backend.herokuapp.com/api/user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Destructure the user data
      const { email, id, username, profilePicture } = userRes.data;
      // setProfilePic(profilePicture);
      // console.log(userRes.data);
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

       // I made use of useState to store the current date + 14 days that the user can be logged in. Every time he logs in its get a check if the date is expired. After the 14 days he is logged out and the LocalStorage is deleted.
      if(!storedDate) {
        const date = new Date().setDate(new Date().getDate() + 14);
        // console.log(new Date(date));

        localStorage.setItem("dateEnt", JSON.stringify({
            expDate: date,
        }));
        setStoredDate(localStorage.getItem("dateEnt"))
      } 

      if (storedDate) {
        const res = (new Date()).getTime() > JSON.parse(storedDate).expDate;
        // console.log(new Date(res));
        if (res) {
          localStorage.removeItem("dateEnt");
          localStorage.removeItem("USER_SELECT_ID");
          localStorage.removeItem("USER_SELECT_IMG");
          localStorage.removeItem('SS_FAVOURITES');
          localStorage.removeItem('favouriteDisabled');
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

  // We store the ID and IMG form the Hero-picker in localstorage.
  useEffect(() => {
    // console.log("stored ID is =>", storedId);
    localStorage.setItem("USER_SELECT_ID", storedId)
    localStorage.setItem("USER_SELECT_IMG", storedImg)
    }, [storedId, storedImg]);

  // useEffect(() => {
  //   console.log('isAuth changed:', authState.isAuth);
  // }, [authState.isAuth]);

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

    navigate("/thank-you", { replace: true });
  }

  const authentication = {
    isAuth: authState.isAuth,
    email: authState.email,
    username: authState.username,
    authState: authState,
    updateAuthState: setAuthState,
    profilePicture: authState.profilePicture,
    logOutFunction: logOut,
    updateDataFunction: getData,
    token: token,
    storedId: storedId,
    setStoredId: setStoredId,
    storedImg: storedImg,
    setStoredImg: setStoredImg,        
   }

  return (

    <AuthContext.Provider value={ authentication }>
      { authState.status === 'done' ? ( children ) : ( <> {showLoading ? (
            <div className="content">
              <img src={logoSupersearch} alt="" />
              <h3>POWER UP</h3>
              <div className="loading"> 
                <p>loading</p>
                <span></span>
              </div>
            </div>
          ) : null}
        </> )}
    </AuthContext.Provider>

  )


}


export default AuthContextProvider;