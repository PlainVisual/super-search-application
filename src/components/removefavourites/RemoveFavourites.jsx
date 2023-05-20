import React from "react";
import "../../components/addfavourites/addfavourites.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";
const favRemove = < FontAwesomeIcon icon={faHeartCircleMinus} />;

function RemoveFavourites() {

  return(

    <>
      <span className="cardfavourites"><i>{favRemove}</i></span>
    </>


  )

}

export default RemoveFavourites;