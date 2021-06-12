import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const MangaDexChapters = () =>{
    const [query, setQuery] = useState("");
    const [mangaID, setMangaID] = useState("");
    const [listing, setList] = useState("");
    const [viewChapters,setViewChapters] = useState(false);
    const [viewChapter,setViewChapter] = useState(false);
    const [activeChapter, setActiveChapter] = useState();
    //const [cover, setCover] = useState();

    const chaptersURL = `https://cors-anywhere.herokuapp.com/https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&limit=30`;
    const mangaURL = `https://cors-anywhere.herokuapp.com/https://api.mangadex.org/manga?title=${query}`
    const mangaTitle = window.location.hash.split("/").slice(3);

    useEffect(() => {
        //const title = window.location.hash.split("/").slice(3);
        setQuery(mangaTitle[0].split("%20").join(" "));
        console.log(query);
        console.log(mangaTitle[0]);
        getManga();
    }, [query])

    useEffect(()=>{
        getList();
    }, [mangaID])

    /*const getCover = async (e) =>{
    const api_call = await fetch(`https://api.mangadex.org/cover/${e}`);
    const data = await api_call.json();
    setCover(data.data.attributes.fileName)
    }*/

    const getManga = async () =>{
        const api_call = await fetch(mangaURL);
        const data = await api_call.json();
        if(data.results.length !== 0){
        setMangaID(data.results[0].data.id);
        //setQuery("");
        }
        //getCover(data.results[0].relationships[3].id);
        /*if(data.results[0].result === "ok"){
        //console.log(mangaID);
        setFound(true);
        }*/
    }

    const getList = async () => {
        if(mangaID !== ""){
        const api_call = await fetch(chaptersURL);
        const data = await api_call.json();
        setList(data.results);
        setViewChapters(true);
        }
    }

    const getChapter = (e,n) =>{
        setActiveChapter(e);
        setViewChapters(false);
        setViewChapter(true);
    }

    return (
        <div className="viewChapters">
        {viewChapters && 
            <div className="chapters">
            {listing.map((item,id) => <Link className="chapter" to={`/read/mangadex/${mangaTitle[0]}/${item.data.attributes.chapter}`} key={id}><h2 onClick={() => getChapter(item,id)} key={uuidv4()}>{item.data.attributes.title} &emsp; ch:{item.data.attributes.chapter}</h2></Link>)}
            </div>}
        </div>
    );
}

export default MangaDexChapters;