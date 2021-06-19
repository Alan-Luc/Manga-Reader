import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MangaDexSearch = () => {
    const [link, setLink] = useState("");
    //const [current, setCurrent] = useState("");
    const [mangaID, setMangaID] = useState("");
    //const [listing, setList] = useState("");
    //const [a,setA] = useState(false);
    //cdconst chaptersURL = `https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&limit=10`;
    //const mangaURL = `https://api.mangadex.org/manga?title=${link}`
    const mangaURL = "https://testing-dep.herokuapp.com/manga";

    useEffect(()=>{
        //getList();
        return () => {
            setMangaID("");
        }
    }, [mangaID])

    const getManga = async () =>{
        const api_call = await fetch(mangaURL,{
            method: "GET",
            headers: {
                title: `${link}`,
            }
        },);
        const data = await api_call.json();
        if(data.results.length !== 0){
          setMangaID(data.results[0].data.id);
          //setCurrent(link);
        }
        else{
            setLink("");
        }
        //getCover(data.results[0].relationships[3].id);
        /*if(data.results[0].result === "ok"){
          //console.log(mangaID);
          setFound(true);
        }*/
    }

    /*const getList = async () => {
        if(mangaID !== ""){
          const api_call = await fetch(chaptersURL);
          const data = await api_call.json();
          setList(data.results);
          //console.log(listing);
          setA(true);
        }
    }*/

    /*const goToPage = () => {
        return(
            <Link to={`/read/mangadex/${current}` }></Link>
        )
        
    }*/

    const onSubmit = e => {
        e.preventDefault();
        getManga();
        //goToPage();
    }

    return (
        <div className = "joinOuterContainerDex">
            <form className ="joinInnerContainer" onSubmit={onSubmit}>
                <h1 className ="headingDex">Search from MangaDex</h1>
                <div>
                    <input 
                        type ="text"
                        placeholder = "Search a MangaDex Title"
                        autoComplete = "off"
                        onChange={(e) => setLink((e.target.value))}
                        className = "joinInput"
                        value = {link}
                        required
                    />
                </div> 
                {link && <Link to={`/read/mangadex/${link}`}>
                    <button className ={'buttonDex mt-20'}>Search</button>
                </Link>}
            </form>
            
        </div>
    )
   
}

export default MangaDexSearch;