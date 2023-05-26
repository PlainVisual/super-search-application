import React from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const search = < FontAwesomeIcon icon={faSearch} />;

function Searchbar({ searchValue, setSearchValue, heroesAll, setHeroesFilterd }) {

  useEffect(() => {
    const searchHeroes = heroesAll.filter((hero) => {
    const formattedName = hero.name.replace(/-/g, '');
    const formattedConnection = hero?.connections?.groupAffiliation.replace(/-/g, '');
    const formattedSearchValue = searchValue.replace(/-/g, '');
    return formattedName.toLowerCase().includes(formattedSearchValue.toLowerCase()) ||
           formattedConnection.toLowerCase().includes(formattedSearchValue.toLowerCase()) ;
  });
  setHeroesFilterd(searchHeroes);
  
}, [searchValue, heroesAll, setHeroesFilterd]);


  return (

     <div className="search-field">
          <input type="search"
            value={ searchValue }
            onChange={(e) => { setSearchValue(e.target.value)}}
            className="back-search-bar"
            id="search-bar" 
            name="search-bar" 
            placeholder="Search for Hero or connection..."
            autoFocus="auto-focus"/>
      <i className="search-icon">{ search }</i>
     </div>

  )
}

export default Searchbar;