import React from "react";

function HeropickerContent({ heroes, imageClick }) {

  return (

    <>
    { heroes.map((hero) => (
         
          <article key={ hero.id } className={`hero-image-button ${ hero.name.replaceAll(' ', '-').toLowerCase() }`} onClick={imageClick}>
             <div className="hero-picker-line">
              
             </div>
              <div className="hero__img">
                 <img
                  src={ hero.placeholder } 
                  data-id={ hero.id } 
                  data-src={ hero.profile } 
                  alt={ hero.name.replaceAll(' ', '-').toLowerCase() } 
                />
                 <div className="hero-picker-line"></div>
                <div className="overlay-hero-name">
                  <div className="overlay-content">
                     <p>{ hero.name }</p>
                  </div>
                </div>
                  <div className="overlay-hero"></div>                
             </div>
          </article>
            
     ))}    
    </>

  )

}

export default HeropickerContent;