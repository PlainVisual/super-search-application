import React from 'react';
import "../ThankYou/thankyou.css";
import { useEffect } from 'react';
import watcherWide from "../../assets/images/theWatcher.jpg";
import { ReactComponent as Logo } from "../../assets/logo-super-search-diap.svg";
import { useNavigate } from 'react-router-dom';

function ThankyouPage() {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Go beyond and beyonder"
  }, []);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <section
      className="thank-you-content"
      style={{ "--background-thank": `url(${watcherWide})` }}
    >
      <div className="left_column left-thank">
        <Logo />
      </div>
      <div className="right_column right-thank">
        <h1>Goodbye, Superhero</h1>
        <h3>We're sorry to see you go.</h3>
        <p>
          We hope you enjoyed exploring the world of Marvel and DC superheroes
          with our app. Thank you for being part of our community, and we wish
          you all the best on your future adventures!
        </p>
      </div>
    </section>
  );
}

export default ThankyouPage;