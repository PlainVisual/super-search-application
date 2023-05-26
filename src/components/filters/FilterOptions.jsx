import React from "react";
import { useEffect } from "react";

function FilterOptions({ heroesAll, setHeroesFilterd, activeFilter, setActiveFilter }) {

  useEffect(() => {
    switch(activeFilter) {
      case "":
        setHeroesFilterd(heroesAll);
        break;
      case "Male":
        const maleHeroes = heroesAll.filter((hero) => hero?.appearance?.gender?.includes(activeFilter));
        setHeroesFilterd(maleHeroes);
        break;
      case "Female":
        const femaleHeroes = heroesAll.filter((hero) => hero?.appearance?.gender?.includes(activeFilter));
        setHeroesFilterd(femaleHeroes);
        break;
      case "good":
        const goodHeroes = heroesAll.filter((hero) => hero?.biography?.alignment?.includes(activeFilter));
        setHeroesFilterd(goodHeroes);
        break;
      case "bad":
        const badHeroes = heroesAll.filter((hero) => hero?.biography?.alignment?.includes(activeFilter));
        setHeroesFilterd(badHeroes);
        break;
        case "X":
          const xmenHeroes = heroesAll.filter((hero) => hero?.connections?.groupAffiliation?.includes(activeFilter));
          setHeroesFilterd(xmenHeroes);
          break;        
       case "Avengers":
        const avengersHeroes = heroesAll.filter((hero) => hero?.connections?.groupAffiliation?.includes(activeFilter));
        setHeroesFilterd(avengersHeroes);
        break;
      case "Justice":
          const justiceHeroes = heroesAll.filter((hero) => hero?.connections?.groupAffiliation?.includes(activeFilter));
          setHeroesFilterd(justiceHeroes);
          break;
      case "Marvel":
        const marvelHeroes = heroesAll.filter((hero) => hero?.biography?.publisher?.includes(activeFilter));
        setHeroesFilterd(marvelHeroes);
        break;
      case "DC":
        const dcHeroes = heroesAll.filter((hero) => hero?.biography?.publisher?.includes(activeFilter));
        setHeroesFilterd(dcHeroes);
        break;
      

    }
    
  }, [activeFilter]);
  

  return (

    <>
      <button className="filter-btn" onClick={() => setActiveFilter("")}>All</button>
      <button className="filter-btn" onClick={() => setActiveFilter("Male")}>Male</button>
      <button className="filter-btn" onClick={() => setActiveFilter("Female")}>female</button>
      <button className="filter-btn" onClick={() => setActiveFilter("good")}>heroes</button>
      <button className="filter-btn" onClick={() => setActiveFilter("bad")}>vilain</button>
      <button className="filter-btn" onClick={() => setActiveFilter("X")}>x-men</button>
      <button className="filter-btn" onClick={() => setActiveFilter("Avengers")}>avengers</button>
      <button className="filter-btn" onClick={() => setActiveFilter("Justice")}>justice league</button>
      <button className="filter-btn" onClick={() => setActiveFilter("Marvel")}>Marvel</button>
      <button className="filter-btn" onClick={() => setActiveFilter("DC")}>DC</button>
    </>

  )

}

export default FilterOptions;