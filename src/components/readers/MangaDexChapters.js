import React,{ useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";

const MangaDexChapters = () =>{
    const [query, setQuery] = useState("");
    const [mangaID, setMangaID] = useState("");
    const [title, setTitle] = useState("");
    const [mangas, setMangas] = useState("");
    const [listing, setListing] = useState("");
    const [viewChapters,setViewChapters] = useState(false);
    const [offset, setOffset] = useState(0);
    const [viewMangas, setViewMangas] = useState(false);
    //const [viewChapter,setViewChapter] = useState(false);
    //const [activeChapter, setActiveChapter] = useState(); 
    const [cover, setCover] = useState();
    const [found, setFound] = useState(true);
    //const location = useLocation();
    //const { found } = location.state;
    const [done, setDone] = useState(undefined);
    const [covers, setCovers] = useState();

    const chaptersURL = `https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/chapter?manga=${mangaID}&translatedLanguage[]=en&offset=${offset}&limit=30`;
    const mangaURL = `https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/manga?title=${(window.location.hash.split("/").slice(3))[0].split("%20").join(" ")}`;
    //const mangaURL = "https://testing-dep.herokuapp.com/manga";
    //const chaptersURL = "https://testing-dep.herokuapp.com/chapter2";
    //const coverURL = "https://testing-dep.herokuapp.com/cover";
    //const mangaTitle = window.location.hash.split("/").slice(3);

    useEffect(() => {
        //const title = window.location.hash.split("/").slice(3);
        //setQuery(mangaTitle[0].split("%20").join(" "));
        //console.log(query);
        //console.log(mangaTitle[0]);
        getMangas();
    }, []);

    useEffect(()=>{
        getList();
    }, [mangaID]);

    useEffect(()=>{
        getList();
    }, [offset]);

    const getCover = async (e) =>{
        const api_call = await fetch(`https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/cover/${e}`);
        const data = await api_call.json();
        setCover(data.data.attributes.fileName);
    }

    /*const getCover2 = async (e) =>{
        const api_call = await fetch(`https://quiet-temple-13952.herokuapp.com/https://api.mangadex.org/cover/${e.relationships[e.relationships.length - 1].id}`);
        const data = await api_call.json();
        setCovers(prev => prev.push(data.data.attributes.fileName));
        
    }*/

    const showE = (e,i) =>{
        //getCover2(e);
       
        return(
            <div>
                {/*<h1>{console.log(covers[i])}</h1>
                <img src={`https://uploads.mangadex.org/covers/${mangaID}/${cover}`} alt="cover"/>*/}
                <h2 className="chapterM" key={uuidv4()} onClick={() => getManga(e)}>{e.data.attributes.title.en}</h2>
            </div> 
        )
        
    }
    

    const getMangas = async () =>{
        setTimeout(async () => {
            const api_call = await fetch(mangaURL);
            const data = await api_call.json();
            if(data.results.length !== 0){
                /*const array = [];
                data.results.map(item => array.push([item.data.attributes.title, item.data.id]));
                console.log(array)
                setMangas(array);
                console.log(mangas)
                setViewMangas(true);*/
                //setQuery("");
                setMangas(data.results);
                setViewMangas(true);
                setDone(true);
            } 
            else if(data.results.length === 0) {
                setFound(false);
            }
        }, [2000]);
    }


    /*const getManga = async () =>{
        const api_call = await fetch(mangaURL);
        const data = await api_call.json();
        if(data.results.length !== 0){
            setMangaID(data.results[0].data.id);
            setTitle(data.results[0].data.attributes.title.en);
            getCover(data.results[0].relationships[data.results[0].relationships.length - 1].id);
        //setQuery("");
        }
        
        if(data.results[0].result === "ok"){
        //console.log(mangaID);
        setFound(true);
        }
    }*/

    const getManga = (e) => {
        setMangaID(e.data.id);
        setTitle(e.data.attributes.title.en);
        getCover(e.relationships[e.relationships.length - 1].id);
        getList();
    }

    const getList = async () => {
        if(mangaID !== ""){
            const api_call = await fetch(chaptersURL);
            const data = await api_call.json();
            setListing(data.results);
            setViewMangas(false);
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
            {/*<button onClick={() => setViewMangas(prev => !prev)}></button>*/}
        {/*!found && <Redirect push to={"/notFound"}/>*/}
        {!done ? (
            <div style= {{width: "100vw", height: "100vw", display: "flex", justifyContent: "center" }}>
                <br></br>
                <ReactLoading
                    type={"cylon"}
                    color={"#415865"}
                    height={800}
                    width={800}
                />
            </div>
        ) : (viewMangas && 
            <div className="viewManga" styles={{paddingTop: "10vw", height: "100vw"}}>
                {(mangas.length > 0) && mangas.map((item,id) => showE(item,id))}
            </div>)
        }
        {viewChapters &&
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <button style={{height: "30px", width: "60px", marginTop: "10px"}} onClick={() => {setOffset(0); setViewChapters(false); setViewMangas(true);}}>Back</button>
                <header>{title}</header>
                <img src={`https://uploads.mangadex.org/covers/${mangaID}/${cover}`} alt="cover art" width="200"/>
                <div className="chapters">
                    {listing.map((item) => <Link className="chapter" to={`/read/mangadex/${mangaID}/${item.data.attributes.chapter}`} key={uuidv4()}><div style={{display: "flex", flexDirection: "row"}}><h2 key={uuidv4()}>&emsp;{item.data.attributes.title}</h2><h2 style={{marginLeft: "auto"}}> {item.data.attributes.chapter}&emsp;</h2></div></Link>)}
                </div>
                <div style={{marginBottom: "20px"}}>
                    <p style={{color: "white", fontSize: "large", textAlign: "center"}}>{listing[0].data.attributes.chapter + " to " + listing[listing.length - 1].data.attributes.chapter}</p>
                    <button style={{width: "50px", height: "50px"}} onClick={prev}>{"<"}</button>
                    <button style={{width: "50px", height: "50px"}} onClick={next}>{">"}</button>
                    {console.log(offset)}
                </div>
            </div>
        }
        </div>
    );
}

export default MangaDexChapters;