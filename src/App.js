import './App.css';
import React, { useState } from "react";

const App = () =>{

    const [pages, setPages] = useState();

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
      return(
        <div>
          {pages !== null ? pages.map(image => <img src={image.link} alt="manga page"/>) : console.log("no pages")};
        </div>
      )
    }

    return(
        <div>
            <button onClick={handleClick}>click</button>
            <button onClick={displayPages}>get pages</button>
        </div>
    )
}

export default App;
