import React from "react";
import "../../components/addfavourites/addfavourites.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
const favorite = < FontAwesomeIcon icon={faHeart} />;
const noFavorite = < FontAwesomeIcon icon={faHeartBroken} />;

function AddFavourites({ favDisabled }) {

  return(

    <>
       
      <span className="cardfavourites">{favDisabled ? <i>{noFavorite}</i> : <i>{favorite}</i>} </span>

    </>


  )

}

export default AddFavourites;