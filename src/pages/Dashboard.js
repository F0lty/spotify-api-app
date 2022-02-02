import '../index.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import SongInfo from '../components/SongInfo';
import RightBox from '../components/RightBox';
import {CSSTransition} from 'react-transition-group';
import SearchBox from '../components/SearchBar';


const Dashboard = () => {


const loadingRef = useRef(null)
const [token,setToken] = useState(window.localStorage.getItem('token'));
const [typedState,setTypedState] = useState('');


const [user,setUser] = useState();
const [song,setSong] = useState(0);

const getUserData = async ()=>{
    const res = await fetch('http://localhost:8000/me',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            },
        body:JSON.stringify({token: token})
    });
const data = await res.json();
return data;

}
useEffect(() => {
    (async()=>{
        const data = await getUserData();
        setUser(await data);
        setSong(await data.items[0].id);
    })();
},[])
useEffect((typedState)=>{
    if(typedState!==''){
        setTypedState('')
    }
},[song])
    return (<>
            <input value={typedState} onChange={e=>setTypedState(e.target.value)}/>
            {typedState!=='' ? 
            <SearchBox typedState={typedState} setSong={setSong}/> : 
            <SongInfo songId = {song}/>
            }
            <RightBox user={user}/>

            </>
    )
}
export default Dashboard;
