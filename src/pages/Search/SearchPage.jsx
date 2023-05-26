import React from "react";
import Button from '../../components/buttons/button';
import Herocard from "../../components/herocard/Herocard";
import Searchbar from "../../components/searchbar/Searchbar"
import "../Search/searchpage.css"
import { useEffect, useState, useContext } from 'react';
import { DataContext } from "../../Context/DataContext";
import FilterOptions from "../../components/filters/FilterOptions";
import Searchslider from "../../components/searchslider/Searchslider";
import AddFavourites from "../../components/addfavourites/AddFavourites";

function SuperSearch() {

  const { favoriteContext, 
          setFavoriteContext, 
          loading, 
          error, 
          heroesFilterd, 
          setHeroesFilterd,
          storedLocalStorage,
          favouriteDisabeld,
          setFavouriteDisabled, 
          heroesAll } = useContext(DataContext);

  const [activeFilter, setActiveFilter] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [sliderValue1, setSliderValue1] = useState(50);
  const [sliderValue2, setSliderValue2] = useState(50);
  const [sliderValue3, setSliderValue3] = useState(50);
  const [sliderValue4, setSliderValue4] = useState(50);
  // const [favouriteDisabeld, setFavouriteDisabled] = useState(JSON.parse(localStorage.getItem("favouriteDisabled")) || []);
 
  // useEffect(() => {
  //   localStorage.setItem('favouriteDisabled', JSON.stringify(favouriteDisabeld));
  // }, [favouriteDisabeld]);
   
  const handleReset = () => {
    setSliderValue1(50)
    setSliderValue2(50)
    setSliderValue3(50)
    setSliderValue4(50)
  };
 
   const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   // We create a copy of the favoriteContext and use this to store the favorites in AuthContext
  const addFavoriteHero = (heroes) => {
    const favoriteIDs = favoriteContext.map((favorite) => favorite.id);  
    if (favoriteIDs.includes(heroes.id)) {
      setFavouriteDisabled((prevMap) => ({ ...prevMap, [heroes.id]: true }));
      return; 
    }
    
    setFavouriteDisabled((prevMap) => ({ ...prevMap, [heroes.id]: true })); 
    const newHeroList = [...favoriteContext, heroes];
    setFavoriteContext(newHeroList);
    storedLocalStorage(newHeroList);
  };

  return (

    <>
    <h1>SuperSearch</h1>
    {loading && <span className='loadingMsg'>Hang on we are loading the data</span>}

    <section className="left_column hero_search_container">
      <div className="searchbar-container">
          <Searchbar
          heroesAll={ heroesAll }
          setHeroesFilterd={ setHeroesFilterd }
          searchValue={ searchValue }
          setSearchValue={ setSearchValue }
          />
      </div>
      <div className="searchslider">
          <Searchslider
            powerstatName="strength"
            heroesAll={ heroesAll }
            setHeroesFilterd={ setHeroesFilterd }
            sliderValue ={ sliderValue1 }
            setSliderValue={ setSliderValue1 }
          />

          <Searchslider
            powerstatName="speed"
            heroesAll={ heroesAll }
            setHeroesFilterd={ setHeroesFilterd }
            sliderValue ={ sliderValue2 }
            setSliderValue={ setSliderValue2 }
          />

          <Searchslider
            powerstatName="durability"
            heroesAll={ heroesAll }
            setHeroesFilterd={ setHeroesFilterd }
            sliderValue ={ sliderValue3 }
            setSliderValue={ setSliderValue3 }
          />

          <Searchslider
            powerstatName="power"
            heroesAll={ heroesAll }
            setHeroesFilterd={ setHeroesFilterd }
            sliderValue ={ sliderValue4 }
            setSliderValue={ setSliderValue4 }
          />
          <button onClick={handleReset}>reset</button>
      </div>
      
    </section>

    <section className="right_column hero_filter_container">
        <FilterOptions 
          heroesAll={ heroesAll }
          setHeroesFilterd= { setHeroesFilterd }
          activeFilter={ activeFilter }
          setActiveFilter={ setActiveFilter }
        />
    </section>

    <section className="search_content">
        {heroesFilterd.length === 0 && <span className="search_nocontent">No Hero or connection was found.</span>} 
        {error && <span>Something went wrong when fetching the data. Please try again later!</span>}
        {heroesFilterd.slice(0, page * itemsPerPage).map((heroes) => (
          <Herocard 
            key={heroes.id} 
            heroes={heroes}
            AddFavorite={ AddFavourites }
            handleFavoriteClick={ () => {addFavoriteHero(heroes)} }
            disabled={favouriteDisabeld[heroes.id]} 
          />
        ))}
        
        {heroesFilterd.length > page * itemsPerPage && (
          <Button onClick={loadMore} variant="primary">
            Load More
          </Button>
        )}       
    </section>
    </>


  )

}

export default SuperSearch;