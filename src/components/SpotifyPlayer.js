import React from 'react'
import {useEffect,useState} from 'react'
import './Options.css'

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}
//PUT INTO TOP LEVEL
function SpotifyPlayer() {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: "Erik's Web Player",
                getOAuthToken: cb => { cb(window.localStorage.getItem('token')); },
                volume: 0.5
            });
    
            
    
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
    
    
            player.connect();

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
                
                setTrack(state.track_window.current_track);
                
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            
            }));
            setPlayer(player);
            console.log(player);
        };
    }, []);
    useEffect(()=>{
        console.log('change Happened');
    },[player])

    return (
        <div className='SpotifyPlayer'>
                    <div className='now-playing__cover' style={{backgroundImage:`url(${current_track.album.images[0].url})`,backgroundSize: 'cover',backgroundBlendMode: 'darken'}}><span>{current_track.name}</span></div>
                    {/* <img src={current_track.album.images[0].url} 
                         className="now-playing__cover" alt="" /> */}


         </div>
    )
}

export default SpotifyPlayer
