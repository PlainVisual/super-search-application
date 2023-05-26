import React from "react";
import { useEffect } from "react";
import "../searchslider/searchslider.css"

function Searchslider({ powerstatName, sliderValue, setSliderValue, heroesAll, setHeroesFilterd}) {

  useEffect(() => {
    const powerstats = heroesAll.filter((hero) => hero.powerstats[ powerstatName ] < sliderValue);
    setHeroesFilterd(powerstats);
  
}, [sliderValue, heroesAll, setHeroesFilterd]);
 

  return (

    <div className="slidecontainer">
      <p>{ powerstatName }</p>
      <input type="range" 
          min="1" max="100" 
          className="slider"
          value={ sliderValue }
          onChange={(e) => { setSliderValue(e.target.valueAsNumber)}} 
          id="myRange" 
      />
    </div>

  )

}

export default Searchslider;