import React, {useEffect} from "react";
import useAuth from "../useAuth";
import './Options.css';
import SpotifyPlayer from '../components/SpotifyPlayer';

function timeConvert(timeMs){
    var minutes = Math.floor(timeMs / 60000);
    var seconds = ((timeMs % 60000) / 1000).toFixed(0);
    return (seconds == 60 ?
    (minutes+1) + ":00" :
    minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

const RightBox = ({userData,setIdToDisplay})=>{
    const {logout} = useAuth();
    console.log(userData);
    if(typeof userData==='undefined'){
        return <div className="RightBox"></div>
    }
    const tracks = userData.tracks.items;
    const artists = userData.artists.items;
    console.log(timeConvert(tracks[0].duration_ms));
    return <div className="RightBox">
        <div className="user">
            <button onClick={logout}>Logout</button>
            <h2>{userData.display_name}</h2>
            <img className="userImage" src={userData.images[0].url}/>
        </div>
        <div className="userTop">{
            tracks.map((item,index)=>{
                if(index==0){
                    return <div key={index}><img src={item.album.images[1].url}/>
                        <h2 onClick={(e)=>{setIdToDisplay({song:item.id})}}>{item.name}</h2>
                        <span >{timeConvert(item.duration_ms)}</span>
                        </div>
                    }
                    return <div key={index}><img src={item.album.images[1].url}/>
                        <a onClick={(e)=>{setIdToDisplay({song:item.id})}}>{item.name}</a>
                        <span>{timeConvert(item.duration_ms)}</span>
                        </div>
                    })
                    }
                </div>
        <div className="userTop">{
            artists.map((item,index)=>{
                if(index==0){
                    return <div key={index}>
                        <img src={item.images[1].url}/><h2 onClick={(e)=>{setIdToDisplay({artist:item.id})}}>{item.name}</h2>
                        <span>{item.followers.total}</span>
                    </div>
                }
                return <div key={index}>
                    <img src={item.images[1].url}/><a onClick={(e)=>{setIdToDisplay({artist:item.id})}}>{item.name}</a>
                    <span>{item.followers.total}</span>
                </div>})
                }
        </div>
        <div className="player"><SpotifyPlayer/></div>
        </div>

}
export default RightBox;