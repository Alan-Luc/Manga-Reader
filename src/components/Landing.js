import React, { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    const [started, setStarted] = useState(false);

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <div className="innerBox">
                    <div className="titleBox">
                        <h1 className="heading">Simple Manga Reader</h1>
                        {started ? 
                            <div>
                                <Link to={"/search/imgur"}>
                                    <button className ={'button mt-10'}>Read from Imgur</button>
                                </Link>
                                <br></br>
                                <Link to={"/search/mangadex"}>
                                    <button className={'button mt-20'}>Read from MangaDex</button>
                                </Link>
                            </div> :
                            <button className="button" onClick={()=> setStarted(true)}>Start Reading</button>}
                    </div>
                    <img className="landingImg" src="https://bit.ly/3lukfG0" alt="manga pic"/>
                </div>
            </div>
            {/*
            <div className="joinInnerContainer">
                <h1 className ="heading">Simple Manga Reader</h1>
                <Link to={"/search/imgur"}>
                    <button className ={'button mt-10'}>Imgur</button>
                </Link>
                <br></br>
                <Link to={"/search/mangadex"}>
                    <button className={'button mt-20'}>MangaDex</button>
                </Link>
            </div>*/}
        </div>
        
    )
}

export default Landing;