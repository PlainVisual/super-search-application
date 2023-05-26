import React from "react";
import { Link } from "react-router-dom";
import "../herocardsmall/herocardsm.css";

function Herocardsm({ heroes, 
                    AddFavorite, 
                    handleFavoriteClick, 
                    disabled }) {

  return (
    <>
      <article className="hero_card-small">
        <div className="hero-card-back">
        <div
          onClick={disabled ? null : handleFavoriteClick}
          className={`card__overlay-small ${disabled ? "card__disabled-small" : ""}`}
        >
          <AddFavorite favDisabled={disabled} />
          
        </div>
        <div className="hero__card-small-container">
          <img src={heroes.images.md} alt="" />
        
         
        </div>
        <div className="hero__content-sm">
            <h3>{heroes.name}</h3>
            <Link className="slider-link" to="/favorites" >Favorits</Link>
          </div>
          </div>
      </article>
    </>
  );

}

export default Herocardsm;