import React from "react";
import "../herocard/herocard.css";
import { useState } from "react";
import Modal from "../modal/Modal";


function Herocard({ heroes, 
                    AddFavorite, 
                    handleFavoriteClick, 
                    disabled }) {

  const [isOpen, setIsOpen ] = useState(false)

  return (
    <>
      <Modal
        heroData={heroes}
        isOpen={isOpen}
        handleFavoriteClick={handleFavoriteClick}
        FavoriteDisabeld={disabled}
        onClose={() => setIsOpen(false)}
      ></Modal>

      <article className="hero_card">
        <div
          onClick={disabled ? null : handleFavoriteClick}
          className={`card__overlay ${disabled ? "card__disabled" : ""}`}
        >
          <AddFavorite favDisabled={disabled} />
        </div>

        <div
          className={`hero__card-container ${disabled ? "card__disabled" : ""}`}
          style={{ "--backgroundImg": `url(${heroes.images.md})` }}
          onClick={() => setIsOpen(true)}
        >
          <div className="hero__name">
            <h3>{heroes.name}</h3>
          <div className="powerstat-element">
            <img src="./src/assets/powerstats.svg" alt="" />
          </div>  
          </div>
        </div>
      </article>
    </>
  );

}

export default Herocard;