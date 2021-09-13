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
  const [activeChapter, setActiveChapter] = useState();
  const [title, setTitle] = useState("");
  const [vertical, setVertical] = useState(true);
  const [size, setSize] = useState(700);
  const [count, setCount] = useState(0);
  const info = window.location.hash.split("/").slice(3);
  const [current, setCurrent] = useState("");
  //const [nextChapter, setNextChapter] = useState(true);
  //const [history, setHistory] = useState([]);

  const chaptersURL = `https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&chapter=${current}`;
  //const mangaURL = `https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/manga?title=${query}`
  //const mangaURL = "https://testing-dep.herokuapp.com/manga";
  //const chaptersURL = "https://testing-dep.herokuapp.com/chapter";

  useEffect(() => {
    setQuery(info[0].split("%20").join(" "));
    setCurrent(info[1]);
    //console.log(query);
    //console.log(title);
    setMangaID(info[0]);
  }, [info])

  useEffect(()=>{
    getChapter();
    setCount(0);
  }, [current])

  /*const getManga = async () =>{
    const api_call = await fetch(mangaURL);
    const data = await api_call.json();
    if(data.results.length !== 0){
      setMangaID(data.results[0].data.id);
      setTitle(data.results[0].data.attributes.title.en);
      //setQuery("");
    }
  }*/

  const getChapter = async () => {
    if(mangaID !== ""){
      const api_call = await fetch(chaptersURL);
      const data = await api_call.json();
      //setList(data.results);
      console.log(data)
      if(data.result === "ok"){
        setTitle(data.data[0].attributes.title);
        setActiveChapter(data.data[0]);
        setViewChapter(true);
        /*const hist = history;
        hist.push({name: `${data.results[0].data.attributes.title}`, ch: `${info[1]}`});
        setHistory(hist);
        console.log(hist);
        localStorage.setItem('History', JSON.stringify(history));*/
      }
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

  const getMeta = (url) => {
    var img = new Image();
    img.src = url;
    //console.log(img.src); 
    const dim = [img.height, img.width];
    return dim;
  }

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
            <Sidebar setVert={setVertical} size={setSize} vert={vertical} title={title} manga={mangaID} chapter={current} history={localStorage.getItem("History")}/>
          </div>
          <div className="zoomBox">
            <div className="zoom">
              <IconButton onClick={() => {(size < 1000) && setSize(prev => prev + 100)}}><ZoomInIcon/></IconButton>
              <IconButton onClick={() => {(size > 200) && setSize(prev => prev - 100)}}><ZoomOutIcon/></IconButton>
            </div>
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
            {vertical && activeChapter.attributes.data.map(item => 
                                                                  <div>
                                                                    {/*console.log(getMeta(`https://uploads.mangadex.org/data/${activeChapter.data.attributes.hash}/${item}`))*/}
                                                                    <img 
                                                                      className="vMangaPage" 
                                                                      src={`https://uploads.mangadex.org/data/${activeChapter.attributes.hash}/${item}`} 
                                                                      alt="page"  
                                                                      key={uuidv4()} 
                                                                      width={(getMeta(`https://uploads.mangadex.org/data/${activeChapter.attributes.hash}/${item}`)[1] >
                                                                       getMeta(`https://uploads.mangadex.org/data/${activeChapter.attributes.hash}/${item}`)[0]) ?
                                                                       size*2 : 
                                                                       size} 
                                                                    />
                                                                  </div>)}
          </div>
          {!vertical &&
            <div>
              <div className="box">
                <div className="box1" onClick={() => {count > 0 && setCount(prev => prev - 1)}}></div>
                <img 
                  className="hMangaPage" 
                  src={`https://uploads.mangadex.org/data/${activeChapter.attributes.hash}/${activeChapter.attributes.data[count]}`} 
                  alt="manga page" 
                  width={(getMeta(`https://uploads.mangadex.org/data/${activeChapter.attributes.hash}/${activeChapter.attributes.data[count]}`)[1] >
                          getMeta(`https://uploads.mangadex.org/data/${activeChapter.attributes.hash}/${activeChapter.attributes.data[count]}`)[0]) ? 
                          size*2 : 
                          size }
                />
                <div className="box2" onClick={() => {count < (activeChapter.attributes.data.length - 1) && setCount(prev => prev + 1)}}></div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default MangaDexReader;