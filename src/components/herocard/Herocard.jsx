import React from "react";
import AddFavourites from "../../components/addfavourites/AddFavourites";
import "../herocard/herocard.css"
;


function Herocard({ heroes, 
                    AddFavorite, 
                    handleFavoriteClick, 
                    disabled }) {

  return (

    <div className="hero_card" style={{ '--backgroundImg':`url(${ heroes.images.md })` }}>
        <div className="hero__name">
              <h3>{ heroes.name }</h3>
              <div  onClick={ disabled ? null : handleFavoriteClick }
                    className={`card__overlay ${disabled ? 'card__disabled' : ''}`} >
                <AddFavorite
                favDisabled={ disabled }
              />            
              </div>  
        </div>
    </div>
    
  )

}

export default Herocard;