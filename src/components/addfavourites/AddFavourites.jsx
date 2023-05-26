import React from "react";
import "../../components/addfavourites/addfavourites.css"
import bookmarkDone from "../../assets/bookmark-done.svg";
import bookmarkUndone from "../../assets/bookmark-undone.svg";

function AddFavourites({ favDisabled }) {

  return(

    <>
       
      <span className="cardfavourites slider-favorite-in">{favDisabled ? <img src={bookmarkUndone} alt="" /> : <img src={bookmarkDone} alt="" />} </span>

    </>


  )

}

export default AddFavourites;