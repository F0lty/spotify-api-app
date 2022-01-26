import React from 'react';
import { useState, useEffect, useRef } from 'react';
import LeftBox from '../components/LeftBox';
import RightBox from '../components/RightBox';
import {CSSTransition} from 'react-transition-group';


const Dashboard = () => {


const loadingRef = useRef(null)
const [toDisplay,setToDisplay]= useState(false)
const [token,setToken] = useState(window.localStorage.getItem('token'));
const [user,setUser] = useState({
    items:[{id:0}]
});


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
console.log("testing branches");
console.log("testing branches");
console.log("testing git");
useEffect(() => {
    (async()=>{
        const data = await getUserData();
        setUser(await data);
        setToDisplay(true);
    })();
}, [])

console.log(toDisplay);
    return (<>
            <LeftBox songId = {user.items[0].id}/>
            <CSSTransition in={toDisplay} timeout={3000} classNames="my-node">

            <RightBox user={user}/>

            </CSSTransition>
            </>
    )
}
export default Dashboard;
