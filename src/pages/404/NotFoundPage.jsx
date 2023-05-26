import React from 'react'
import "../404/nopage.css"
import Button from '../../components/buttons/button';
import watcherWide from "../../assets/images/theWatcher.jpg";
import { ReactComponent as Logo } from "../../assets/logo-super-search-diap.svg";

function NotFoundPage() {

  useEffect(() => {
    document.title = "You are lost in the Mutiverse"
  }, []);

  return (
    <section className="thank-you-content" style={{ "--background-thank": `url(${watcherWide})` }}>
        <div className="left_column left-thank">
          <Logo />
        </div>
        <div className="right_column right-404">
            <h1>404</h1>
            <div className="notfound-text">
            <h3>You are lost in the Multiverse.</h3>
            <p> The Watcher will help you on your way!</p>
            </div>
            <div className="notfound-btn">
            <Button 
              type="button"
              className="no-page-btn"
              goToPage="/"
            >
              Find your way home
            </Button>

            <Button 
              type="button"
              goToPage="/"
            >
              Search Heroes
            </Button>
            </div>
        </div>

    </section>  
    
  )
}

export default NotFoundPage;