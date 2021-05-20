import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SwipeableTemporaryDrawer from "./Sidebar";
import SelectPage from "./SelectPage";
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

//import { Link } from 'react-router-dom';
//import queryString from 'query-string';

const Reader = ({ location }) =>{
    const [pages, setPages] = useState();
    const [toggle, setToggle] = useState(false);
    const [query, setQuery] = useState();
    //const [currentId, setCurrentId] = useState();
    const hash = window.location.pathname.split("/");
    const [vertical, setVertical] = useState(true);
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(800);
    const [openNav, setOpenNav] = useState(false);

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
        link: "https://i.imgur.com/uMuzsmq.png"
      },
      {
        link: "https://i.imgur.com/pVyjzh0.png"
      },
      {
        link: "https://i.imgur.com/QwRn96r.png"
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      },
      {
        link: "https://i.imgur.com/9axHI5G.png"
      }
    ]*/

    //const [toggle, setToggle] = useState(true); // for testing
    //const [pages, setPages] = useState(obj); // for testing

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

    /*const bar = () => {
      document.getElementsByClassName('Sidebar').style.width = '250px'
      document.getElementsByClassName('pp').style.marginLeft = '250px'
      setOpenNav(true)
    }*/
    
    /* 
    console.log(toggle);
    console.log(vertical);
    console.log(count);
    console.log(size);
    */

    return(
        <div className={vertical ? "vApp" : "hApp"}>

          <div className = "pp">
            <SwipeableTemporaryDrawer penis={setVertical} wiener={setSize} pp={vertical}/>
          </div>
          <div className="zoom">
            <IconButton onClick={() => {(size < 1200) && setSize(prev => prev + 100)}}><ZoomInIcon/></IconButton>
            <IconButton onClick={() => {(size > 600) && setSize(prev => prev - 100)}}><ZoomOutIcon/></IconButton>
          </div>

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
              {(toggle && vertical) && pages.map(item => <img className="vMangaPage" src={item.link} alt="manga page" key={uuidv4()} width={size}/>)}
            </div>
            {(toggle && !vertical) &&
            <div>
              <img className="hMangaPage" src={pages[count].link} alt="manga page" width={size}/>
              <div>
                <SelectPage pages={pages} counter={count} newCount={setCount} />
              </div>
            </div>
            }
        </div>
    )
}

export default Reader;
