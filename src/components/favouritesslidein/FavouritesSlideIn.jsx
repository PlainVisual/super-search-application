import React from "react";
import "../favouritesslidein/favouritesslidein.css"
import { NavLink } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Herocardsm from "../herocardsmall/Herocardsm";
import RemoveFavourites from "../../components/removefavourites/RemoveFavourites"

function FavouritesSlideIn({ favIsOpen, setFavIsOpen }) {

  const { logOutFunction } = useContext(AuthContext);
  const { favoriteContext,
    loading, 
    error,
    removeFavouriteHero, 
  } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


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

  return (

    <nav className={`macro-slidein-fav ${favIsOpen ? 'active' : 'inactive'}`}>
      {favoriteContext.length === 0 && <span className="favorite_nocontent">No Favourites are added. Search for some heroes and ad them to your favorites</span>}
      {error && <span>Something went wrong when fetching the data. Please try again later!</span>}
      <div className="slide-container">
          <div className="favo-items">
          <button onClick={ () => setFavIsOpen(!favIsOpen) }>close</button>
          {favoriteContext.slice(0, page * itemsPerPage).map((favourites) => (

              <Herocardsm 
                key={favourites.id} 
                heroes={favourites}
                AddFavorite={ RemoveFavourites }
                handleFavoriteClick={ () => removeFavouriteHero(favourites) } 
              />

            


            ))}
            {favoriteContext.length > page * itemsPerPage && (
              <Button onClick={loadMore} variant="primary">
                Load More
              </Button>
            )}       
          </div> 
      </div>
    </nav>

  )
}

export default FavouritesSlideIn;