import React from 'react';

function AlbumInfo({data}) {
    const albumData = data.album;
    if(!albumData){
        return <div className="LeftBox" id="loading"><h1>Loading</h1></div>
    }
  return <div><h1>{albumData.name}</h1><img src={albumData.images[1].url}/></div>;
}


export default AlbumInfo;
