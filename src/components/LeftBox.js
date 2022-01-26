import React, {useEffect} from "react";
import './Options.css';
import AnalysisComp from "./AnalysisComp";
import { useState, useRef} from "react/cjs/react.development";
import SearchBar from "./SearchBar";
import {CSSTransition} from 'react-transition-group';


const songInfoHandler = async (setSongInfo,songId,token,setToDisplay)=>{
    if(!songId){
        return
    }
    const res = await fetch('http://localhost:8000/song_analysis',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            },
        body:JSON.stringify({token: token, id:songId})
    });
    const data = await res.json();
    setSongInfo(await data);
    setToDisplay(true);

}

const LeftBox = ({songId})=>{
    const token = window.localStorage.getItem('token');
    
    const nodeRef = useRef(null)
    const loadingRef = useRef(null)
    const [songInfo,setSongInfo] = useState(null);
    const [toDisplay,setToDisplay]= useState(false)
    
    useEffect(() => {
        songInfoHandler(setSongInfo,songId,token,setToDisplay);

    }, [songId])
    if(!songInfo){
        return <CSSTransition in={!toDisplay} timeout={3000} classNames="my-node" nodeRef={loadingRef}><div className="LeftBox" id="loading" ref={loadingRef}><h1>Loading</h1></div></CSSTransition>
    }
    return <CSSTransition in={toDisplay} timeout={3000} classNames="my-node" nodeRef={nodeRef}>
        <div className="LeftBox" ref={nodeRef}>
        
        <SearchBar />
        <div className="NameAndPic">
            <div className="Artist"><h1>{songInfo.generalInfo.name}</h1><h2 style={{marginLeft:'10%'}}>{songInfo.generalInfo.artists[0].name}</h2></div>
            <img className="AlbumCover" src={songInfo.generalInfo.album.images[1].url}></img>
        </div>
        <div className="greenBoxesWrapper">
            <div className="GreenBox">Genre: {songInfo.details.genres[0]}</div>
            <div className="GreenBox">Release Date: {songInfo.generalInfo.album.release_date}</div>
        </div>
        <AnalysisComp songAnalysis={songInfo.analysis} songPopularity={songInfo.generalInfo.popularity}/>
        
    </div>
    </CSSTransition>
}
export default LeftBox;