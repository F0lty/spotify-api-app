import artistFiller from './assets/artist-filler.png';

export async function getUserData (logout,token){
    try{
        const controller = new AbortController();
        const signal = controller.signal;
        const res = await fetch('http://localhost:8000/me',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            signal:signal,
            body:JSON.stringify({token:token})
        });
    const data = await res.json();
    if(typeof await data.error !=='undefined'){
        throw new Error(data.error.message);
    }
    return data;
    }catch(err){
        logout();
    }
}

export async function infoHandler (key,id,token,setFetchedData){
    if(!id){
        return
    }
    try{
        const res = await fetch('http://localhost:8000/'+key,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({token: token, id: id})
        });
        var dataObject = {song:null,artist:null,album:null};
        const data = await res.json();
        dataObject[key]= await data;
        console.log(await dataObject);
        setFetchedData(await dataObject);
    }catch(err){
        console.log(err);
    }
}
export async function getSearchData(setSearchedFetchedData,setSearchImages,token,logout,typedState){
    try{    const res = await fetch('http://localhost:8000/search',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({token: token,query: typedState})
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
    setSearchImages({trackImgs:tracksImgUrls,artistImgs:artistsImgUrls,albumImgs:albumsImgUrls})
    setSearchedFetchedData(await data);
    }catch(err){
        console.log(err);
    }
    
    
    
    }
