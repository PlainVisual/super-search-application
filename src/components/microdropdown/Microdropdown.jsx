import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import "../microdropdown/microdropdown.css";

function MicroDropdown({ isOpen }) {

  const { logOutFunction } = useContext(AuthContext);

  return (

    
    <nav className={`micro-drop-down ${isOpen ? 'active' : 'inactive'}`}>
      <div className="micro-items">
        <h4>Edit your account</h4>
        <NavLink to="/profile">My profile</NavLink>
        <button type="button" onClick={logOutFunction}> Log out</button>
      </div>
    </nav>
    




  );

}


export default MicroDropdown;