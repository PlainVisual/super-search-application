import React from 'react'
import Button from '../../components/buttons/button';
import "../SplashScreen/splashscreen.css";
import { ReactComponent as Logo } from "../../assets/logo-super-search-diap.svg";
import groupHeroes from "../../assets/images/neon-avengers-group.png";

function  SplashScreen() {

  return (
    <section className="splash-content">
      <div className="splash-info">
        <div className="splash-logo-container">
          <Logo />
        </div>
        <div className="intro-text">
          <h1>Unleash Your Inner Hero with SuperSearch</h1>
          <p>
            Are you a die-hard fan of superheroes from the Marvel and DC
            universes? Want to know more about your favorite characters, and
            their powers? Look no further than SuperSearch -{" "}
            <span className="splash-bold">
              the one-stop app for all your superhero needs!
            </span>
          </p>
          <div className="cta-buttons">
            <Button classAtrribute="primary-btn" btnType="button" goToPage="/signup" isDisabled={false}>
              Get started
            </Button>

            <Button classAtrribute="secondary-btn" btnType="button" goToPage="/login" isDisabled={false}>
              Login
            </Button>
          </div>
        </div>
      </div>

      <div className="splash-img-container">
        <div className="splash-img">
          <img src={groupHeroes} alt="" />
        </div>
      </div>
    </section>
  );



}

export default SplashScreen;