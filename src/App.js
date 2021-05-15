import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () =>{
    const [pages, setPages] = useState();
    const [toggle, setToggle] = useState(false)
    const [query, setQuery] = useState()

    //const accessToken = "Bearer 6b478c21d23e90b19dbcaf8523c28659d422716b"

    /*const handleClick = () =>{
      fetch("https://api.imgur.com/3/album/zYLDaPN", {
            method: "GET",
            headers: {
                Authorization:"Client-ID 7ce042b065faaa3"
            }
        })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            setPages(data.data.images);
            console.log(pages)
      });
    }*/

    const handleChange = e =>{
      setQuery(e.target.value);
    }

    const handleSubmit = () =>{
      setToggle(true);
      fetch(`https://api.imgur.com/3/album/${query}`, {
            method: "GET",
            headers: {
                Authorization:"Client-ID 7ce042b065faaa3"
            }
        })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            setPages(data.data.images);
            console.log(pages)
      });
    }

    return(
        <div>
            {/*<button onClick={handleClick}>click</button>*/}
            <form onSubmit={handleSubmit}>
                <input 
                  type="text"
                  className="search"
                  placeholder="Enter Album Id"
                  autoComplete="off"
                  onChange={handleChange}
                  value={query}
                />
            </form>
            <div className="pages">
              {toggle ? pages.map(item => <img src={item.link} alt="manga page" key={uuidv4()} width="200"/>) : null}
            </div>
            
        </div>
    )
}

export default App;
