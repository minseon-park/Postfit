import {Link, useLocation} from "react-router-dom";
import '../css/PageNotFound.css';
import NotFound from '../images/PageNotFound/404NotFound.png';

function PageNotFound() {
    /**
     * This component represents our ERR404 page if a user tries to
     * access a page/component we have yet to define or create.
     * they're provided a link back to '/'
     */
    const path = useLocation();
    return (
        <div className="page-not-found">
            <h1>Error 404: Page not found</h1>
            <div classname="img-div">
                <img className="img-404" src={NotFound} />
            </div>
            <p className="page-text">The page "{path.pathname}" does not exist.</p>
            <Link className="home-link" to="/">Back to Home...</Link> 
        </div>
    )
}

export default PageNotFound;