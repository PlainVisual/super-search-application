import React from "react";
import Button from '../../components/buttons/button';
import axios from "axios";
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import RangeSlider from "../../components/rangeslider/RangeSlider";
import "../../pages/Home/home.css"

function Home() {

  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(true);
  const { storedId, storedImg } = useContext(AuthContext);
  const [ charaterPicture, setCharacterPicture ] = useState('');
  const [ heroName, setHeroName ] = useState("")
  const [ heroBio, setHeroBio ] = useState({});
  const [ heroFysic, setHeroFysic ] = useState({});
  const [ powerStat, setPowerStat ] = useState({});

  const powerSubStat = Object.entries(powerStat).filter(([statKey]) => { return [ 'strength', 'speed', 'power', 'durability' ].includes(statKey) })

  useEffect(() => {
    document.title = "You have arrived in the Multiverse"
  }, []);


  useEffect(() => {
    setCharacterPicture(storedImg);
  }, [storedImg]);

  useEffect(() => {
    heroStats()    
  }, [])
  

  const API_KEY = 1289640744930206;

  const heroStats = async () => {

    try {
      toggleError(false);
      const res = await axios.get(`https://superheroapi.com/api.php/${ API_KEY }/${ storedId }/`);
      const stats = res.data;
      setHeroBio(stats?.biography);
      setPowerStat(stats?.powerstats);
      setHeroName(stats.name);
      setHeroFysic(stats?.appearance);

      setTimeout(() => {
        toggleLoading(false);
        }, 500);
    
      // console.log(stats);

    } catch(e) {
      // console.error(e);
      toggleError(true);
      toggleLoading(false);
    }

  }

  return (
    <>
      <section className="home-content">
       
        <div className="left_column home-left">
          <div className="home-bio">
            <h1>{heroName}</h1>
            <div className="home-stats">
              <article className="powerstats">
               <h4>Powerstats</h4>
                {error && (
                  <span>
                    Something went wrong when fetching the data. Please try
                    again later!
                  </span>
                )}
                {powerSubStat.length === 0 ? (
                  <div className="msgError">
                    <p>Loading the stats hang on!...</p>
                  </div>
                ) : (
                  powerSubStat.map(([statKey, statValue]) => (
                    <RangeSlider
                      key={statKey}
                      statName={statKey}
                      statSetter={statValue}
                    />
                  ))
                )}
              </article>
              <article className="hero_bio">
              <h4>Bio</h4>
                <p><span>name:</span> {heroBio["full-name"]}</p>
                <p><span>race:</span> {heroFysic?.race}</p>
                <p><span>gender:</span> {heroFysic?.gender}</p>
                <p><span>eye color:</span> {heroFysic?.["eye-color"]}</p>
                <p><span>height:</span> {heroFysic?.height?.[1]}</p>
                <p><span>weight:</span> {heroFysic?.weight?.[1]}</p>
              </article>
            </div>
            <Button classAtrribute="primary-btn" btnType="button" goToPage="/search" isDisabled={false}>
              find more heroes
            </Button>
          </div>
         </div>
        <div className="right_column home-right">
          <figure>
            <img src={charaterPicture} />
          </figure>
        </div>
      </section>
    </>
  );
}

export default Home;
