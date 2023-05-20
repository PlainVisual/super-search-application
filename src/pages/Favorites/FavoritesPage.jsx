import React from 'react'
import Button from '../../components/buttons/button'
import { useEffect, useState, useContext } from 'react';
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
    <>
      {loading && <span className='loadingMsg'>Hang on we are loading the data</span>}
      <section className="favorite_content">
        {favoriteContext.length === 0 && <span className="favorite_nocontent">No Favourites are added. Search for some heroes and ad them to your favorites</span>}
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
            Load More
          </Button>
        )}       
    </section>
    <div>FavoritesPage</div>
    <Button 
    btnType="button"
    goToPage="/profile"
    isDisabled= { false }
  >   
    Profile
  </Button>
  </>
  )
}

export default FavoritesPage;