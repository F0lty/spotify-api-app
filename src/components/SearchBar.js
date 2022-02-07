import React,{useState,useEffect} from 'react'
import SearchOption from './SearchOption';
import artistFiller from '../assets/artist-filler.png';
import useAuth from "../useAuth";



const getSearchData = async (query,setSearchData, token,setTrackImage,setArtistImages,setAlbumImages,logout)=>{
try{    const res = await fetch('http://localhost:8000/search',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            },
        body:JSON.stringify({token: token,query: query})
    });
const data = await res.json();
if(typeof await data.error !=='undefined'){
    throw new Error(data.error.message);
}
const tracksImgUrls = [];
const albumsImgUrls = [];
const artistsImgUrls = [];
console.log(await data);
for(let i = 0;i<await data.tracks.items.length;i++){
    if(data.tracks.items[i].album.images[1].url!=='undefined'){
        tracksImgUrls.push(await data.tracks.items[i].album.images[1].url)
    }else{
        tracksImgUrls.push(artistFiller);
    }
    
}
for(let i = 0;i<await data.albums.items.length;i++){
    if(data.albums.items[i].images[1].url!=='undefined'){
        albumsImgUrls.push(await data.albums.items[i].images[1].url)
    }else{
        albumsImgUrls.push(artistFiller);
    }
    
}
for(let i = 0;i<await data.artists.items.length;i++){
    if(data.artists.items[i].images.length>2){
        artistsImgUrls.push(await data.artists.items[i].images[1].url)
    }else{
        artistsImgUrls.push(artistFiller);
    }
    
}
setTrackImage(tracksImgUrls);
setArtistImages(artistsImgUrls);
setAlbumImages(albumsImgUrls);
setSearchData(await data);
}catch(err){
    console.log(err);
    // logout();
}



}
function SearchBox(typedState,setSong) {
    const {logout } = useAuth();
    const token = window.localStorage.getItem('token');
    const [searchData,setSearchData] = useState(null);
    const [albumImages,setAlbumImages] = useState('');
    const [artistImages,setArtistImages] = useState('');
    const [trackImage, setTrackImage] = useState('');
    useEffect(()=>{
        const delayDebounceFn = setTimeout(() => {
            getSearchData(typedState.typedState,setSearchData,token,setTrackImage,setArtistImages,setAlbumImages,logout);
          }, 300)
      
          return () => clearTimeout(delayDebounceFn)
    },[typedState.typedState])
    
    if(searchData===null){
        return <div><h1>Start Typing</h1></div>
    }
    const tracksDiv = ()=>{
        if(searchData.tracks.items.length>0){
            let remainer = searchData.tracks.items.slice(1);

            return <div className="searchOption">
                <div className='topSearch'><img src={trackImage[0]}/><div><h1><a onClick={(e)=>typedState.setSong(searchData.tracks.items[0].id)}>{searchData.tracks.items[0].name}</a></h1><span>{searchData.tracks.items[0].artists[0].name}</span></div></div>
                <div className='otherSearch'>{remainer.map((item,i)=>{return <div key={i}><img src={trackImage[i+1]}/><div><span onClick={(e)=>typedState.setSong(item.id)}>{item.name}</span><span style={{color:'grey'}}>{item.artists[0].name}</span></div><span>{}</span></div>})}</div>
            </div>
            
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>
    };
    const artistDiv = ()=>{
        if(searchData.artists.items.length>0){
            let remainer = searchData.artists.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'><img src={artistImages[0]}/><div><h2><a onClick={(e)=>typedState.setSong(searchData.artists.items[0].id)}>{searchData.artists.items[0].name}</a></h2></div></div>
                <div className='otherSearch'>{remainer.map((item,i)=>{return <div key={i}><img src={artistImages[i+1]}/><span onClick={(e)=>typedState.setSong(item.id)}>{item.name}</span></div>})}</div>
            </div>
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>;
    };
    const albumsDiv = ()=>{
        if(searchData.albums.items.length>0){
            let remainer = searchData.albums.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'><img src={albumImages[0]}/><div><h2><a onClick={(e)=>typedState.setSong(searchData.albums.items[0].id)}>{searchData.albums.items[0].name}</a></h2></div></div>
                <div className='otherSearch'>{remainer.map((item,i)=>{return <div key={i}><img src={albumImages[i+1]}/><span onClick={(e)=>typedState.setSong(item.id)}>{item.name}</span></div>})}</div>
            </div>
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>
    };
    return (
            
        <div className='searchBox'>
                {tracksDiv()}
                {artistDiv()}
                {albumsDiv()}
        </div>
        )
    }

export default SearchBox
