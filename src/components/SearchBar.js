import React,{useState,useEffect} from 'react'
import SearchOption from './SearchOption';



const getSearchData = async (query,setSearchData, token)=>{
    const res = await fetch('http://localhost:8000/search',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            },
        body:JSON.stringify({token: token,query: query})
    });
const data = await res.json();
console.log(await data)
setSearchData(data);

}
function SearchBox(typedState,setSong) {
    const token = window.localStorage.getItem('token');
    const [searchData,setSearchData] = useState(null);
    console.log(typedState);
    useEffect(()=>{
        const delayDebounceFn = setTimeout(() => {
            getSearchData(typedState.typedState,setSearchData,token);
          }, 300)
      
          return () => clearTimeout(delayDebounceFn)
    },[typedState.typedState])
    
    if(searchData===null){
        return <div><h1>Start Typing</h1></div>
    }
    const artistDiv = ()=>{
        if(searchData.artists.items.length>0){
            let remainer = searchData.artists.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'>{searchData.artists.items[0].name}</div>
                <div className='otherSearch'><ul>{remainer.map(item=>{return <li>{item.name}</li>})}</ul></div>
            </div>
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>;
    };
    const tracksDiv = ()=>{
        if(searchData.tracks.items.length>0){
            let remainer = searchData.tracks.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'>{searchData.tracks.items[0].name}</div>
                <div className='otherSearch'><ul>{remainer.map(item=>{return <li><a onClick={(e)=>typedState.setSong(item.id)}>{item.name}</a></li>})}</ul></div>
            </div>
            
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>
    };
    const albumsDiv = ()=>{
        if(searchData.albums.items.length>0){
            let remainer = searchData.albums.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'>{searchData.albums.items[0].name}</div>
                <div className='otherSearch'><ul>{remainer.map(item=>{return <li>{item.name}</li>})}</ul></div>
            </div>
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>
    };
    return (
            
        <div className='searchBox'>
                {tracksDiv()}
                {artistDiv()}
                {albumsDiv()}
                {/* <SearchOption props={searchData}/> */}
        </div>
        )
    }

export default SearchBox
