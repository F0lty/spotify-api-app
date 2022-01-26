import React from 'react';
import { useState,useEffect } from 'react';

const GetSong = ({setUserData})=> {
const [user,setUser] = useState(null);
const [searchType,setSearchType] = useState('artists');


const fetchUserData = async token => {
    var promises = [];
    const resUserInfo = await fetch('http://localhost:8000/me',{
        method: 'POST',
        mode:'cors',
        headers:{
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({token: token})
    });
    const dataUserInfo = await resUserInfo.json()
    

    const resUserFavourite = await fetch('http://localhost:8000/top_favourite',{
        method: 'POST',
        mode:'cors',
        headers:{
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({token: token,type: searchType})
    });
    const dataUserFavourite = await resUserFavourite.json();
    promises.push(dataUserInfo,dataUserFavourite);

        if(searchType == 'tracks'){
            const resAnalysis = await fetch('http://localhost:8000/song_analysis',{
                method: 'POST',
                mode:'cors',
                headers:{
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({token: token, id: await dataUserFavourite.items[0].id})
            });
            const dataAnalysis = await resAnalysis.json();
            promises.push(dataAnalysis);
        }


    Promise.all(promises).then((values)=>{console.log(searchType); setUser(values)})
}
//----------------------------------------------------------------------------------------

useEffect(() => {                                               //Get User Data
    const token = localStorage.getItem('token');
    fetchUserData(token);
}, [searchType])

useEffect(()=>{                                                 //Send them to sibling
    setUserData(user);
},[user])
//------------------------------------------------------------------------------------------

const changeSearchType = ()=>{
    if(searchType == 'artists'){
        setSearchType('tracks');
    }else{
        setSearchType('artists');
    }

}
    return (
        <div className='GetSong'>
            <h2>{!user ? '' : user[0].display_name}</h2>
            <button onClick={changeSearchType}>Change Type</button>
        </div>
    )
}

export default GetSong
