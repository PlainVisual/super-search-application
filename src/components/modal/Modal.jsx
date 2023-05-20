import React, { useEffect, useRef, useState } from "react";
import "../../components/modal/modal.css";
import RangeSlider from "../rangeslider/RangeSlider";
import { useMatch } from "react-router-dom";
import { isClickInsideRectangle } from "../../Helpers/boundingClientRect";

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
      <form method="dialog">
        <div className="popup_container">
          <div className="hero__content">
            <div className="hero-biography">
              <h3>{heroData.name}</h3>
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

              <p>{heroFysic?.race}</p>
              <p>{heroFysic?.gender}</p>
              <p>{heroFysic?.eyeColor}</p>
              <p>{heroFysic?.height?.[1]}</p>
              <p>{heroFysic?.weight?.[1]}</p>
              <p>{heroBio?.fullName}</p>
              <p>{heroBio?.["aliases"]}</p>
              <p>{heroBio?.placeOfBirth}</p>
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
                remove from favorite
              </button>
            )}

            {matchSearchUrl && (
              <button
                className="popup-add-favourite"
                onClick={handleFavoriteClick}
                disabled={FavoriteDisabeld}
              >
                Add to favorite
              </button>
            )}
          </div>

          <div
            className="hero__img"
            style={{ "--backgroundImg": `url(${heroData.images.lg})` }}
          >
            <button className="hero__btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        {children}
      </form>
    </dialog>
  );
}

export default Modal;
