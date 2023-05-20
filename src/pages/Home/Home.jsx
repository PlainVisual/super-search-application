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
        }, 200);
    
      console.log(stats);

    } catch(e) {
      console.error(e);
      toggleError(true);
      toggleLoading(false);
    }

  }

  return (
    <>
    {loading && <span className='loadingMsg'>Hang on we are loading the data</span>}
    <section className="left_column">
    <h1>{ heroName }</h1>
    <article className="powerstats">
    {error && <span>Something went wrong when fetching the data. Please try again later!</span>}
                 { powerSubStat.length === 0 ? (
                    <div className="msgError">
                      <p>Loading...</p>
                    </div>
                  ) : (                                        
                      powerSubStat.map(([ statKey, statValue ]) => (
                        <RangeSlider 
                            key={ statKey } 
                            statName={ statKey }
                            statSetter={ statValue }
                        /> 
                              
                      ))
                    
                  )}
      </article>  
      <article className="hero_bio">
      <p>{ heroBio['full-name'] }</p>
    <p>{ heroFysic?.race }</p>
    <p>{ heroFysic?.gender }</p>
    <p>{ heroFysic?.['eye-color'] }</p>
    <p>{ heroFysic?.height?.[1] }</p>
    <p>{ heroFysic?.weight?.[1] }</p>                 

      </article>

    </section>
    <section className="right_column">
      <figure><img src={ charaterPicture } /></figure>
    </section>
  
   </>

    
  );
}

export default Home;
