import React from "react";
import "../favouritesslidein/favouritesslidein.css"
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { useContext, useState, useEffect } from "react";
import Button from "../buttons/button";
import Herocardsm from "../herocardsmall/Herocardsm";
import RemoveFavourites from "../../components/removefavourites/RemoveFavourites"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function FavouritesSlideIn({ favIsOpen, setFavIsOpen }) {

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
      <button className="fav-btn-close" onClick={ () => setFavIsOpen(!favIsOpen) }><FontAwesomeIcon icon={faClose} /></button>
      <h1>Favorites</h1>
     
      {error && <span>Something went wrong when fetching the data. Please try again later!</span>}
      <div className="slide-container">
        
          <div className="favo-items">
          {favoriteContext.length === 0 && <span className="favorite_nocontent">No Favourites are added. <Link to="/search">Search for more heroes</Link> and ad them to your favorites</span>}
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