import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

export const DataContext = createContext({});

function DataContextProvider({ children }) {

  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(true);
  const [favoriteContext, setFavoriteContext] = useState(JSON.parse(localStorage.getItem("SS_FAVOURITES")) || []);
  const [heroesAll, setHeroesAll] = useState([])
  const [heroesFilterd, setHeroesFilterd] = useState([]);
  const [favouriteDisabeld, setFavouriteDisabled] = useState(JSON.parse(localStorage.getItem("favouriteDisabled")) || []);
 
  useEffect(() => {
    localStorage.setItem('favouriteDisabled', JSON.stringify(favouriteDisabeld));
  }, [favouriteDisabeld]);

  useEffect(() => {
    console.log("favoriteContext updated:", favoriteContext);
  }, [favoriteContext]);

  useEffect(() => {
    heroData()    
  }, [])

  const heroData = async () => {

    try {
      toggleError(false);
      const res = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
      const mutants = res.data;
      const mutantsPublisher = mutants.filter((publisher) =>
         publisher?.biography?.publisher?.includes("Marvel") ||
         publisher?.biography?.publisher?.includes("DC")
      );
      setHeroesAll(mutantsPublisher);
      setHeroesFilterd(mutantsPublisher);

      setTimeout(() => {
        toggleLoading(false);
        }, 200);
            
      
    } catch(e) {
      console.error(e);
      toggleError(true);
      toggleLoading(false);
     
    }

  }

  const storedLocalStorage = (favoriteContext) => {
    localStorage.setItem("SS_FAVOURITES", JSON.stringify(favoriteContext));
  }

  const data = {
    favoriteContext: favoriteContext,
    setFavoriteContext: setFavoriteContext,
    heroesAll: heroesAll,
    setHeroesAll: setHeroesAll,
    heroesFilterd: heroesFilterd,
    setHeroesFilterd: setHeroesFilterd,
    loading: loading,
    error: error,
    storedLocalStorage: storedLocalStorage,
    favouriteDisabeld: favouriteDisabeld,
    setFavouriteDisabled: setFavouriteDisabled,
    }

  return (

    <DataContext.Provider value={ data }>
      { children }
    </DataContext.Provider>

  )


}

export default DataContextProvider;