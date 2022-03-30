import '../index.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import SongInfo from '../components/SongInfo';
import RightBox from '../components/RightBox';
import {CSSTransition} from 'react-transition-group';
import SearchBox from '../components/SearchBar';
import useAuth from "../useAuth";

import {getUserData,infoHandler,getSearchData} from '../fetchFunctions.js'
import ArtistInfo from "../components/ArtistInfo";
import AlbumInfo from "../components/AlbumInfo";


const Dashboard = () => {

const {logout} = useAuth();

const [token,setToken] = useState(window.localStorage.getItem('token'));
const [typedState,setTypedState] = useState('');
const [user,setUser] = useState();
const [IdToDisplay,setIdToDisplay] = useState(0);
const [fetchedData,setFetchedData] = useState(0);

const [searchFetchedData,setSearchedFetchedData] = useState(null);
const [searchImages,setSearchImages] = useState([{trackImgs:null},{artistImgs:null},{albumImgs:null}]);
var typeOfData = useRef('song');


//To run only at the beginning (On Mount)
useEffect(() => {
    (async()=>{
        const data = await getUserData(logout,token);
        setUser(await data);
        setIdToDisplay({song: await data.tracks.items[0].id});
    })();
    return () => {
    };
},[])

//To run ONLY when changing the child to display (when change from artist to album/album to track/artist to search etc...)
useEffect((typedState)=>{
    if(typedState!=''){
        setTypedState('');
    }
    let keys = Object.keys(IdToDisplay);
    for(let i = 0;i<=keys.length;i++){
        if(IdToDisplay[keys[i]]!=null){
            typeOfData.current = keys[i];
        }
    }
    
    infoHandler(typeOfData.current,IdToDisplay[typeOfData.current],token,setFetchedData);
},[IdToDisplay])

//To run ONLY when search is active
useEffect(()=>{
    if(typedState!=''){
        const delayDebounceFn = setTimeout(() => {
            getSearchData(setSearchedFetchedData,setSearchImages,token,logout,typedState);
          }, 0)
        return () => clearTimeout(delayDebounceFn);
    }
},[typedState]);

const conditionalRenderFunction = (()=>{
    if(typedState!=''){
        return <SearchBox data = {searchFetchedData} searchImages={searchImages} setIdToDisplay={setIdToDisplay}/>
    }
    switch(typeOfData.current){
        case 'song':
            return <SongInfo data = {fetchedData} setIdToDisplay={setIdToDisplay}/>;
        case 'artist':
            return <ArtistInfo data = {fetchedData} setIdToDisplay={setIdToDisplay}/>;
        case 'album':
            return <AlbumInfo data = {fetchedData} setIdToDisplay={setIdToDisplay}/>
    }
})


    return (<>
            <input value={typedState} placeholder='Search' onChange={e=>{setTypedState(e.target.value);}}/>
            {conditionalRenderFunction(typedState,IdToDisplay)}
            <RightBox userData={user} setIdToDisplay={setIdToDisplay}/>

            </>
    )
}
export default Dashboard;
