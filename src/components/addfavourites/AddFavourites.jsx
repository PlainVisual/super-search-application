import React from "react";
import "../../components/addfavourites/addfavourites.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const favorite = < FontAwesomeIcon icon={faHeart} />;

function AddFavourites({ favDisabled }) {

  return(

    <>
       
      <span className="cardfavourites">{favDisabled ? `Added to Favourites` : `add to favourites`} <i>{favorite}</i></span>

    </>


  )

}

export default AddFavourites;