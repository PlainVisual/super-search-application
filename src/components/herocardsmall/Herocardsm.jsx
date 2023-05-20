import React from "react";
import "../herocardsmall/herocardsm.css";

function Herocardsm({ heroes, 
                    AddFavorite, 
                    handleFavoriteClick, 
                    disabled }) {

  return (
    <>
      <article className="hero_card-small">
        <div className="hero__card-small-container">
          <img src={heroes.images.md} alt="" />
          <div
          onClick={disabled ? null : handleFavoriteClick}
          className={`card__overlay-small ${disabled ? "card__disabled-small" : ""}`}
        >
          <AddFavorite favDisabled={disabled} />
          
        </div>
         
        </div>
        <div className="hero__content-sm">
            <h3>{heroes.name}</h3>
          </div>
      </article>
    </>
  );

}

export default Herocardsm;