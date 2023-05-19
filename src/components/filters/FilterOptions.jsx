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

    <div className="filter_container">
      <button onClick={() => setActiveFilter("")}>All</button>
      <button onClick={() => setActiveFilter("Male")}>Male</button>
      <button onClick={() => setActiveFilter("Female")}>female</button>
      <button onClick={() => setActiveFilter("good")}>heroes</button>
      <button onClick={() => setActiveFilter("bad")}>vilain</button>
      <button onClick={() => setActiveFilter("X")}>x-men</button>
      <button onClick={() => setActiveFilter("Avengers")}>avengers</button>
      <button onClick={() => setActiveFilter("Justice")}>justice league</button>
      <button onClick={() => setActiveFilter("Marvel")}>Marvel</button>
      <button onClick={() => setActiveFilter("DC")}>DC</button>
    </div>

  )

}

export default FilterOptions;