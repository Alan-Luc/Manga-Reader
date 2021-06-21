import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="container">
                <div className="centered">
                    <h1 style={{color: '#eca1a6'}}>Page not found!</h1>
                    <Link to="/search/mangadex"><h1 style={{color: '#eca1a6'}}>Back to the search page</h1></Link>
                </div>
            <img src="https://i.imgur.com/ANCpysM.png" style={{width: '100%'}}/>
        </div>
    )
}
export default PageNotFound;