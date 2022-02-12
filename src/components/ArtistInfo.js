import React from 'react';


function ArtistInfo({data,setIdToDisplay}) {
    const artistData = data.artist;
    if(!artistData){
        return <div className="LeftBox" id="loading"><h1>Loading</h1></div>
    }
  return <div><h1>{artistData.name}</h1><img src={artistData.images[1].url}/></div>;
}

export default ArtistInfo;
