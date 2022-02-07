import React from 'react';

function SearchOption({props}) {
console.log(props);
const searchResult = [props.tracks,props.artists,props.albums];

const divs = [0,0,0];

var tracksDiv = <></>;


if(props.tracks.total>0){

  let remaining = props.tracks.items.splice(0,1);
  tracksDiv = <div className="searchOption">
  <div className='topSearch'>
    <img src={require(props.tracks.items[0].album.images[1].url)}/>
    {props.tracks.total>0 && props.tracks.items[0].name}
  </div>
  <div className='otherSearch'><ul>{remaining.map(item=>{return <li>{item.name}</li>})}</ul></div>
</div>;
}

if(props.artists.total>0){

}
if(props.albums.total>0){

}
  return <>
    {tracksDiv}
    <div className="searchOption">
      <div className='topSearch'>{props.artists.total>0 && props.artists.items[0].name}</div>
      <div className='otherSearch'></div>
    </div>
    <div className="searchOption">
      <div className='topSearch'>{props.albums.total>0&& props.albums.items[0].name}</div>
      <div className='otherSearch'></div>
    </div>
  </>;
}

export default SearchOption;
