import React, {useEffect} from "react";
import './Options.css';
import AnalysisComp from "./AnalysisComp";
import { useState, useRef} from "react/cjs/react.development";
import {CSSTransition} from 'react-transition-group';

const songInfoHandler = async (setSongInfo,songId,token,setToDisplay,songRef)=>{
    if(!songId){
        return
    }
    try{
        const res = await fetch('http://localhost:8000/song_analysis',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({token: token, id:songId})
        });
        const data = await res.json();
        songRef.current = await data;
        setToDisplay(true);
    }catch(err){
        alert(err);
    }


}

const SongInfo = ({songId})=>{
    
    const token = window.localStorage.getItem('token');
    
    const nodeRef = useRef(null)
    const loadingRef = useRef(null)
    const songRef = useRef(null);
    
    const [toDisplay,setToDisplay]= useState(false)



    useEffect(() => {
        songInfoHandler(toDisplay,songId,token,setToDisplay,songRef);
    }, [songId])

    console.log(songRef);
    //If there is no song info to display, show Loading screen
    if(!songRef.current){
        return <CSSTransition in={!toDisplay} timeout={3000} classNames="my-node" nodeRef={loadingRef}><div className="LeftBox" id="loading" ref={loadingRef}><h1>Loading</h1></div></CSSTransition>
    }

    //If there is song info, display it here

    
    return (
    <CSSTransition in={toDisplay} timeout={3000} classNames="my-node" nodeRef={nodeRef}>
        <div className="LeftBox" ref={nodeRef}>
        <div className="NameAndPic">
            <div className="Artist"><h1>{songRef.current.generalInfo.name}</h1><h2 style={{marginLeft:'10%'}}>{songRef.current.generalInfo.artists[0].name}</h2></div>
            {/* <div className="AlbumCover" style={{backgroundImage: `url(${songRef.current.generalInfo.album.images[1].url})`}}></div> */}
            <img className="AlbumCover" src={songRef.current.generalInfo.album.images[1].url}/>
        </div>
        <div className="greenBoxesWrapper">
            <div className="GreenBox">{songRef.current.details.genres[0]}</div>
            <div className="GreenBox">{songRef.current.generalInfo.album.release_date}</div>
        </div>
        <AnalysisComp songAnalysis={songRef.current.analysis} songPopularity={songRef.current.generalInfo.popularity}/>
        
    </div>
    </CSSTransition>
    )
}
export default SongInfo;