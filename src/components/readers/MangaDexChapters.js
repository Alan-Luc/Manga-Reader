import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const MangaDexChapters = () =>{
    const [query, setQuery] = useState("");
    const [mangaID, setMangaID] = useState("");
    const [title, setTitle] = useState("");
    const [listing, setListing] = useState("");
    const [viewChapters,setViewChapters] = useState(false);
    const [offset, setOffset] = useState(0);
    //const [viewChapter,setViewChapter] = useState(false);
    //const [activeChapter, setActiveChapter] = useState();
    const [cover, setCover] = useState();

    const chaptersURL = `https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&offset=${offset}&limit=30`;
    const mangaURL = `https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/manga?title=${query}`;
    //const mangaURL = "https://testing-dep.herokuapp.com/manga";
    //const chaptersURL = "https://testing-dep.herokuapp.com/chapter2";
    //const coverURL = "https://testing-dep.herokuapp.com/cover";
    const mangaTitle = window.location.hash.split("/").slice(3);

    useEffect(() => {
        //const title = window.location.hash.split("/").slice(3);
        setQuery(mangaTitle[0].split("%20").join(" "));
        //console.log(query);
        //console.log(mangaTitle[0]);
        getManga();
    }, [query]);

    useEffect(()=>{
        getList();
    }, [mangaID]);

    useEffect(()=>{
        getList();
    }, [offset]);

    const getCover = async (e) =>{
        const api_call = await fetch(`https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/cover/${e}`);
        const data = await api_call.json();
        console.log(data)
        setCover(data.data.attributes.fileName);
    }

    const getManga = async () =>{
        const api_call = await fetch(mangaURL);
        const data = await api_call.json();
        if(data.results.length !== 0){
            setMangaID(data.results[0].data.id);
            setTitle(data.results[0].data.attributes.title.en);
            getCover(data.results[0].relationships[data.results[0].relationships.length - 1].id);
        //setQuery("");
        }
        
        /*if(data.results[0].result === "ok"){
        //console.log(mangaID);
        setFound(true);
        }*/
    }

    const getList = async () => {
        if(mangaID !== ""){
            const api_call = await fetch(chaptersURL);
            const data = await api_call.json();
            setListing(data.results);
            setViewChapters(true);
        }
    }

    /*const getChapter = (e,n) =>{
        setActiveChapter(e);
        setViewChapters(false);
        setViewChapter(true);
    }*/

    const prev = () => {
        if(offset >= 30){
            setOffset(prev => prev - 30);  
        }
    }

    const next = () => {
        if(listing.length >= 30){
            setOffset(prev => prev + 30);
        }
    }

    return (
        <div className="viewChapters">
        {viewChapters &&
            <div>
                <header>{title}</header>
                <img src={`https://uploads.mangadex.org/covers/${mangaID}/${cover}`} alt="cover art" width="200"/>
                <div className="chapters">
                    {listing.map((item) => <Link className="chapter" to={`/read/mangadex/${mangaTitle[0]}/${item.data.attributes.chapter}`} key={uuidv4()}><h2 key={uuidv4()}>{item.data.attributes.title} &emsp; ch:{item.data.attributes.chapter}</h2></Link>)}
                </div>
                <div>
                    <p style={{color: "white"}}>{listing[0].data.attributes.chapter + " to " + listing[listing.length - 1].data.attributes.chapter}</p>
                    <button onClick={prev}>{"<"}</button>
                    <button onClick={next}>{">"}</button>
                    {console.log(offset)}
                </div>
            </div>
        }
        </div>
    );
}

export default MangaDexChapters;