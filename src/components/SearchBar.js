
function SearchBox({data,searchImages,setIdToDisplay}) { //Fix This to make sense

    const albumImages = searchImages.albumImgs;
    const artistImages = searchImages.artistImgs;
    const trackImage = searchImages.trackImgs;
    if(data===null){
        return <div><h1>Loading</h1></div>
    }
    const tracksDiv = ()=>{
        if(data.tracks.items.length>0){
            let remainer = data.tracks.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'><img src={trackImage[0]}/><div><h1><a onClick={(e)=>setIdToDisplay({song:data.tracks.items[0].id})}>{data.tracks.items[0].name}</a></h1><span onClick={(e)=>setIdToDisplay({artist:data.tracks.items[0].artists[0].id})}>{data.tracks.items[0].artists[0].name}</span></div></div>
                <div className='otherSearch'>{remainer.map((item,i)=>{return <div key={i}><img src={trackImage[i+1]}/><div><span onClick={(e)=>setIdToDisplay({song:item.id})}>{item.name}</span><span onClick={(e)=>setIdToDisplay({artist:item.artists[0].id})} style={{color:'grey'}}>{item.artists[0].name}</span></div></div>})}</div>
            </div>
            
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>
    };
    const artistDiv = ()=>{
        if(data.artists.items.length>0){
            let remainer = data.artists.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'><img src={artistImages[0]}/><div><h2><a onClick={(e)=>setIdToDisplay({artist:data.artists.items[0].id})}>{data.artists.items[0].name}</a></h2></div></div>
                <div className='otherSearch'>{remainer.map((item,i)=>{return <div key={i}><img src={artistImages[i+1]}/><span onClick={(e)=>setIdToDisplay({artist:item.id})}>{item.name}</span></div>})}</div>
            </div>
        }
            return <div className="searchOption"><div className='topSearch'>No Results</div></div>;
    };
    const albumsDiv = ()=>{
        if(data.albums.items.length>0){
            let remainer = data.albums.items.slice(1);
            return <div className="searchOption">
                <div className='topSearch'><img src={albumImages[0]}/><div><h2><a onClick={(e)=>setIdToDisplay({album:data.albums.items[0].id})}>{data.albums.items[0].name}</a></h2></div></div>
                <div className='otherSearch'>{remainer.map((item,i)=>{return <div key={i}><img src={albumImages[i+1]}/><span onClick={(e)=>setIdToDisplay({album:item.id})}>{item.name}</span></div>})}</div>
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
