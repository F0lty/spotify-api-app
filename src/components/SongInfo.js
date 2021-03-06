import React, {useEffect} from "react";
import './Options.css';
import AnalysisComp from "./AnalysisComp";
import { useState, useRef} from "react/cjs/react.development";
import {setSong} from '../fetchFunctions.js';

const SongInfo = ({data,setIdToDisplay})=>{
    const nodeRef = useRef(null)
    const loadingRef = useRef(null);
    const songData = data.song;
    const token = window.localStorage.getItem('token');
    //If there is no song info to display, show Loading screen
    if(!songData){
        return <div className="LeftBox" id="loading" ref={loadingRef}><h1>Loading</h1></div>
    }
    console.log(data.song.generalInfo.uri);
        return (
            
                <div className="LeftBox" ref={nodeRef}>
                <div className="NameAndPic">
                    <div className="Artist"><h1><a onClick={()=>{setSong(data.song.generalInfo.uri,token)}}>{songData.generalInfo.name}</a></h1><h2 onClick={(e)=>setIdToDisplay({artist:songData.generalInfo.artists[0].id})} style={{marginLeft:'10%'}}>{songData.generalInfo.artists[0].name}</h2></div>
                    <img className="AlbumCover" src={songData.generalInfo.album.images[1].url}/>
                </div>
                <div className="greenBoxesWrapper">
                    <div className="GreenBox">{songData.details.genres[0]}</div>
                    <div className="GreenBox">{songData.generalInfo.album.release_date}</div>
                </div>
                <AnalysisComp songAnalysis={songData.analysis} songPopularity={songData.generalInfo.popularity}/>
                
            </div>
            
            )

}
export default SongInfo;