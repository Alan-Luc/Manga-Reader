import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//import { Link } from 'react-router-dom';
//import queryString from 'query-string';

const Reader = ({ location }) =>{
    const [pages, setPages] = useState();
    const [toggle, setToggle] = useState(false);
    const [query, setQuery] = useState();
    //const [currentId, setCurrentId] = useState();

    useEffect(() => {
      const hash = window.location.pathname.split("/")
      //console.log(hash[hash.length-1])
      setQuery(hash[hash.length-1])
      console.log(query);
      //console.log(window.location.href)
      getPages();
    }, [query]);

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
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      }
    ]*/

    /*useEffect(() => {
      getPages();
    }, [currentId]);*/

    const getPages = async () =>{ 
      if(query !== ""){
        const api_call =  await fetch(`https://api.imgur.com/3/album/${query}`, {
              method: "GET",
              headers: {
                  Authorization:"Client-ID 7ce042b065faaa3"
              }
        });
        const data = await api_call.json();
        setPages(data.data.images);
        if(data.success){
          setToggle(true);
        }
        else{
          setToggle(false);
        }
        console.log(data);
        console.log(pages);
      }
    }

    /*const handleChange = e =>{
      setQuery(e.target.value);
    }

    const getId = () => {
      if(query.length >= 18){
        const id = query.slice(18, query.length).split("/");
        setCurrentId(id[1]);
      }
    }

    const handleSubmit = e =>{
      e.preventDefault();
      //getId();
      //for testing
      setPages(obj);
      setToggle(true);
    }*/

    return(
        <div className="App">
            {/*<form onSubmit={handleSubmit}>
                <input 
                  type="text"
                  className="search"
                  placeholder="Enter Album Id"
                  autoComplete="off"
                  onChange={handleChange}
                  value={query}
                />
            </form>*/}
            <div className="pages">
              {toggle ? pages.map(item => <img className="mangaPage" src={item.link} alt="manga page" key={uuidv4()} width="800"/>) : null}
            </div>
        </div>
    )
}

export default Reader;
