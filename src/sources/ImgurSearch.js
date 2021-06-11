import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'


const ImgurSearch = () => {
    const [link, setLink] = useState();
          
    return (
        <div className="joinOuterContainerImgur">
            <form className="joinInnerContainer">
                <h1 className="headingImgur">Read from Imgur</h1>
                <div>
                    <input 
                        type ='text'
                        placeholder = 'Enter an imgur link'
                        autoComplete = 'off'
                        onChange={(e) => setLink((e.target.value).slice(18, e.target.value.length).split('/'))}
                        className = 'joinInput'
                        required
                    />
                </div> 
               {link && 
                <Link to={`/read/imgur/${link[1]}`} >
                    <button className ={'buttonImgur mt-20'}>Read</button>
                </Link>}
            </form>
        </div>
    )
}

export default ImgurSearch;