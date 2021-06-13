import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Sidebar";
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import SelectPage from "../SelectPage";

const MangaDexReader = () => {
  const [query, setQuery] = useState("");
  const [mangaID, setMangaID] = useState("");
  //const [listing, setList] = useState("");
  //const [viewChapters,setViewChapters] = useState(false);
  const [viewChapter,setViewChapter] = useState(false);
  //const [found, setFound] = useState(false);
  const [activeChapter, setActiveChapter] = useState();
  const [title, setTitle] = useState("");
  const [vertical, setVertical] = useState(true);
  const [size, setSize] = useState(700);
  const [count, setCount] = useState(0);
  //const [num, setNum] = useState();
  const [info, setInfo] = useState(window.location.hash.split("/").slice(3));
  //const [cover, setCover] = useState();

  const chaptersURL = `https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&chapter=${info[1]}`;
  const mangaURL = `https://api.mangadex.org/manga?title=${query}`

  useEffect(() => {
    setQuery(info[0].split("%20").join(" "));
    //console.log(query);
    //console.log(title);
    getManga();
  }, [query])

  useEffect(()=>{
    getChapter();
  }, [mangaID])

  const getManga = async () =>{
    const api_call = await fetch(mangaURL);
    const data = await api_call.json();
    if(data.results.length !== 0){
      setMangaID(data.results[0].data.id);
      setTitle(data.results[0].data.attributes.title.en);
      //setQuery("");
    }
  }

  const getChapter = async () => {
    if(mangaID !== ""){
      const api_call = await fetch(chaptersURL);
      const data = await api_call.json();
      //setList(data.results);
      setActiveChapter(data.results[0]);
      setViewChapter(true);
    }
  }

  /*const getChapter = (e,n) =>{
    setActiveChapter(e);
    setNum(n);
    console.log(n);
    setViewChapters(false);
    setViewChapter(true);
  }*/

  /*const getChapter = (e) =>{
    setActiveChapter(e);
    setA(false);
    setB(true);
  }*/

  return (
    <div className={vertical ? "vApp" : "hApp"}>
      {/*viewChapters && 
        <div className="chapters">
          {listing.map((item,id) => <h2 className="chapter" onClick={() => getChapter(item,id)} key={uuidv4()}>{item.data.attributes.title} &emsp; ch:{item.data.attributes.chapter}</h2>)}
      </div>*/}
      {/*viewChapter &&
        <div>
          {list.map(item => <h1 onClick={getChapter(item)} key={uuidv4()}>{item.data.attributes.title}</h1>)}
        </div>
      */}
      {viewChapter && 
        <div>
          <div className = "sidebar">
            <Sidebar setVert={setVertical} size={setSize} vert={vertical} title={title}/>
          </div>
          <div className="zoom">
            <IconButton onClick={() => {(size < 1000) && setSize(prev => prev + 100)}}><ZoomInIcon/></IconButton>
            <IconButton onClick={() => {(size > 200) && setSize(prev => prev - 100)}}><ZoomOutIcon/></IconButton>
          </div>
          {!vertical &&
          <div className="pageSelect">
            <SelectPage pages={activeChapter.data.attributes.data} counter={count} newCount={setCount} vert={vertical}/>
          </div>}
          {/*<button 
            onClick={() => {  
                              setVertical(true);
                              setViewChapter(false);
                              //setViewChapters(true);
                          }}>Back
                        </button>*/}
          <div className="pages">
            {vertical && activeChapter.data.attributes.data.map(item => <img className="vMangaPage" src={`https://uploads.mangadex.org/data/${activeChapter.data.attributes.hash}/${item}`} alt="page"  key={uuidv4()} width={size}/>)}
          </div>
          {!vertical &&
            <div>
              <div className="box">
                <div className="box1" onClick={() => {count > 0 && setCount(prev => prev - 1)}}></div>
                <img className="hMangaPage" src={`https://uploads.mangadex.org/data/${activeChapter.data.attributes.hash}/${activeChapter.data.attributes.data[count]}`} alt="manga page" width={size}/>
                <div className="box2" onClick={() => {count < (activeChapter.data.attributes.data.length - 1) && setCount(prev => prev + 1)}}></div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default MangaDexReader;