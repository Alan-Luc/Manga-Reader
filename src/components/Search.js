import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'


const Search = () => {
    const [link, setLink] = useState();

    /*const getId = () => {
        if(link.length >= 18){
          const id = link.slice(18, link.length).split("/");
          setHash(id[1]);
          console.log(hash);
        }
    }*/

    /*const handleChange = (e) =>{
        if(e.target.value >= 18){
            setLink((e.target.value).slice(18, e.target.value.length).split('/'));
            console.log()
        }
    }*/
          
    return (
        
        <div className = "joinOuterContainer">
            <form className ="joinInnerContainer">
                <h1 className ="heading">Read Manga</h1>
                <div>
                    <input 
                        className="search"
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
                    <button className ={'button mt-20'}>Read</button>
                </Link>}
            </form>
        </div>
    )
}

export default Search;