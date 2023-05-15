import React from "react";


function HeropickerContent({ heroes, imageClick }) {

  return (

    <>
    { heroes.map((hero) => (
         
         <div key={ hero.id } className={`image-button ${ hero.name.replaceAll(' ', '-').toLowerCase() }`} onClick={imageClick}>
             <img
               src={ hero.placeholder } 
               data-id={ hero.id } 
               data-src={ hero.profile } 
               alt={ hero.name.replaceAll(' ', '-').toLowerCase() } />
         </div>
             
     )) };    
    </>

  )

}

export default HeropickerContent;