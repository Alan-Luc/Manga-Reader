import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () =>{
    const [pages, setPages] = useState();
    const [toggle, setToggle] = useState(false)
    const [query, setQuery] = useState()

    //const accessToken = "Bearer 6b478c21d23e90b19dbcaf8523c28659d422716b"

    //for testing
    /*const obj = [
      {
        link: "https://i.imgur.com/9axHI5G.png"
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      }
    ]*/

    const getPages = () =>{
      if(query !== ""){
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
    }

    const handleChange = e =>{
      setQuery(e.target.value);
    }

    const handleSubmit = e =>{
      e.preventDefault();
      getPages();
      if(pages != null){
        setToggle(true);
      }
      //for testing
      //setPages(obj);
    }

    return(
        <div className="App">
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
              {toggle ? pages.map(item => <img src={item.link} alt="manga page" key={uuidv4()} width="800"/>) : null}
            </div>
            
        </div>
    )
}

export default App;
