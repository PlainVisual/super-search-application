import React, { useEffect, useRef, useState } from "react";
import "../../components/modal/modal.css";
import RangeSlider from "../rangeslider/RangeSlider";
import { useMatch } from "react-router-dom";
import { isClickInsideRectangle } from "../../Helpers/boundingClientRect";
import bookmarkDone from "../../assets/bookmark-done.svg";
import bookmarkUndone from "../../assets/bookmark-undone.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


function Modal({
  heroData,
  isOpen,
  onClose,
  children,
  handleFavoriteClick,
  FavoriteDisabeld,
}) {
  
  const ref = useRef(null);
  const [powerStat, setPowerStat] = useState({});
  const [heroBio, setHeroBio] = useState({});
  const [heroFysic, setHeroFysic] = useState({});
  const [heroWork, setHeroWork] = useState({});
  const [heroConnection, setHeroConnection] = useState({});
  const matchFavoriteUrl = useMatch("favorites");
  const matchSearchUrl = useMatch("search");

  useEffect(() => {
    setPowerStat(heroData?.powerstats);
    setHeroFysic(heroData?.appearance);
    setHeroBio(heroData?.biography);
    setHeroWork(heroData?.work);
    setHeroConnection(heroData?.connections);
  }, []);

  const powerSubStat = Object.entries(powerStat).filter(([statKey]) => {
    return ["strength", "speed", "power", "durability"].includes(statKey);
  });

  console.log();

  useEffect(() => {
    if (isOpen) {
      if (!ref.current.open) {
        ref.current.showModal();
        document.body.classList.add("modal-open");
      }
    } else {
      if (ref.current.open) {
        ref.current.close();
        document.body.classList.remove("modal-open");
      }
    }
  }, [isOpen]);

  const handleClick = (e) => {
    if (ref.current && !isClickInsideRectangle(e, ref.current)) {
      if (!e.target.classList.contains("popup-add-favourite")) {
        e.stopPropagation();
        onClose();
      }
    }
  };

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={handleClick}
      modal-mode="popup"
      modal-close="close"
    >
      <form className="model-form" method="dialog">
        <div className="popup_container">
          <div className="hero__content">
            <div className="hero-biography">
              <h1>{heroData.name}</h1>
              <h4>Powerstats</h4>
              <div className="powerstats hero_stats">
                {powerSubStat.length === 0 ? (
                  <div className="msgError">
                    <p>Loading...</p>
                  </div>
                ) : (
                  powerSubStat.map(([statKey, statValue]) => (
                    <RangeSlider
                      key={statKey}
                      statName={statKey}
                      statSetter={statValue}
                    />
                  ))
                )}
              </div>
              <h4>Personal information</h4> 
              <div className="bio-info">    
              <p><span>Race:</span> {heroFysic?.race}</p>
              <p><span>Gender:</span> {heroFysic?.gender}</p>
              <p><span>Eyecolor:</span> {heroFysic?.eyeColor}</p>
              <p><span>Height:</span> {heroFysic?.height?.[1]}</p>
              <p><span>Weight:</span> {heroFysic?.weight?.[1]}</p>
              <p><span>Fullname:</span> {heroBio?.fullName}</p>
              <p><span>Aliases:</span> {heroBio?.["aliases"]}</p>
              <p><span>Place of birth:</span> {heroBio?.placeOfBirth}</p>
              </div> 
              <h4>Base of operations</h4>
              <p>{heroWork?.base}</p>
              <h4>Part of</h4>
              <p>{heroConnection?.groupAffiliation}</p>
            </div>

            {matchFavoriteUrl && (
              <button
                className="popup-remove-favourite"
                onClick={handleFavoriteClick}
                disabled={FavoriteDisabeld}
              >
                <img src={bookmarkUndone} alt="" />
                remove from favorite
              </button>
            )}

            {matchSearchUrl && (
              <button
                className="popup-add-favourite"
                onClick={handleFavoriteClick}
                disabled={FavoriteDisabeld}
              > 
                <img src={bookmarkDone} alt="" />
                Add to favorite
              </button>
            )}
          </div>

          <div
            className="hero__img hero__img-modal"
            style={{ "--backgroundImg": `url(${heroData.images.lg})` }}
          >
            <button className="hero__btn" onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </div>
        {children}
      </form>
    </dialog>
  );
}

export default Modal;
