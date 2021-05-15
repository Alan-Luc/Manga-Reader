import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () =>{
    const [pages, setPages] = useState();
    const [toggle, setToggle] = useState(false)

    //const accessToken = "Bearer 6b478c21d23e90b19dbcaf8523c28659d422716b"

    const handleClick = () =>{
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
    }

    const displayPages = () =>{
      setToggle(true);
      console.log(pages)
    }

    return(
        <div>
            <button onClick={handleClick}>click</button>
            <button onClick={displayPages}>get pages</button>
            {toggle ? pages.map(item => <img src={item.link} alt="manga page" key={uuidv4()} width="200"/>) : null}
        </div>
    )
}

export default App;
