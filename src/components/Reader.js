import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import SwipeableTemporaryDrawer from "./Sidebar";
import SelectPage from "./SelectPage";
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

const Reader = () =>{
    const [pages, setPages] = useState();
    const [toggle, setToggle] = useState(false);
    const [query, setQuery] = useState();
    const hash = window.location.pathname.split("/");
    const [vertical, setVertical] = useState(true);
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(800);
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
      const hash = window.location.pathname.split("/")
      setQuery(hash[hash.length-1])
      console.log(query);
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
    
    //onKeyDown={() => keyPress()} tabIndex="0" for bottom div

    return(
        <div className={vertical ? "vApp" : "hApp"}>

          <div className = "pp">
            <SwipeableTemporaryDrawer setVert={setVertical} size={setSize} vert={vertical}/>
          </div>
          <div className="zoom">
            <IconButton onClick={() => {(size < 1000) && setSize(prev => prev + 100)}}><ZoomInIcon/></IconButton>
            <IconButton onClick={() => {(size > 600) && setSize(prev => prev - 100)}}><ZoomOutIcon/></IconButton>
          </div>
          {!vertical &&
          <div>
            <SelectPage pages={pages} counter={count} newCount={setCount} vert={vertical} />
          </div>}
            <div className="pages">
              {(toggle && vertical) && pages.map(item => <img className="vMangaPage" src={item.link} alt="manga page" key={uuidv4()} width={size}/>)}
            </div>
            {(toggle && !vertical) &&
            <div >
              <div className="box" >
                <div className="box1" onClick={() => {count > 0 && setCount(prev => prev - 1)}}></div>
                <img className="hMangaPage" src={pages[count].link} alt="manga page" width={size}/>
                <div className="box2" onClick={() => {count < (pages.length - 1) && setCount(prev => prev + 1)}}></div>
              </div>
            </div>
            }
        </div>
    )
}

export default Reader;
