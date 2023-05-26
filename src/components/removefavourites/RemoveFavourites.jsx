import React from "react";
import "../../components/addfavourites/addfavourites.css"
import bookmarkDone from "../../assets/bookmark-done.svg";
import bookmarkUndone from "../../assets/bookmark-undone.svg";

function RemoveFavourites() {

  return(

    <>
      <span className="cardfavourites slider-favorite-in"><img src={bookmarkUndone} alt="" /></span>
    </>


  )

}

export default RemoveFavourites;