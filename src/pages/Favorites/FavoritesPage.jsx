import React from 'react'
import Button from '../../components/buttons/button'
import { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from "../../Context/DataContext";
import Herocard from '../../components/herocard/Herocard';
import RemoveFavourites from "../../components/removefavourites/RemoveFavourites"
import "../../pages/Favorites/favoritespage.css"

function FavoritesPage() {
  
  const { favoriteContext,
          loading, 
          error,
          removeFavouriteHero, 
        } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = "All your heroes united and at your command"
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
      ) {
        loadMore();
      }
    };
  
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };

  }, []);

  return (
    <>
    <section className="favorite-container">
    <section className="favorite-content">
        <h1>Favorites</h1>        
      <div className="favorite-items" ref={containerRef} >
      {loading && <span className='loadingMsg'>Hang on we are loading the data</span>}
      
        {favoriteContext.length === 0 && <span className="favorite_nocontent">No Favourites are added. <Link to="/search">Search for some heroes</Link> and ad them to your favorites</span>}
        {error && <span>Something went wrong when fetching the data. Please try again later!</span>} 
        {favoriteContext.slice(0, page * itemsPerPage).map((favourites) => (
          <Herocard 
            key={favourites.id} 
            heroes={favourites}
            AddFavorite={ RemoveFavourites }
            handleFavoriteClick={ () => removeFavouriteHero(favourites) } 
          />
        ))}
        
        {favoriteContext.length > page * itemsPerPage && (
          <Button onClick={loadMore} variant="primary">
            Scroll to load more
          </Button>
        )}
        
        </div>
      </section>        
    </section>
       </>
  )
}

export default FavoritesPage;