import React from "react";
import "../../components/rangeslider/rangeslider.css"

function RangeSlider({ statSetter, statName }) {

  return (

    <div className="range_slider">
      <div className="stat__number">{ statSetter }</div>
      <div className="stat__content">
        <h3>{ statName }</h3>
        <div className="range__track" 
            style={{ '--width':`${ statSetter }%` }}>
              
        </div>
        <div className="stat__track"></div>
      </div>
    </div>

  )

}

export default RangeSlider;