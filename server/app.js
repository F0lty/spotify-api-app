const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');
const port = 8000;

//Bug Notes - Handle Errors -> When given expired token, redirect home with an error


const generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
const state = generateRandomString(16);
const clientID = "9fe9f3b602db4034a25ca78191081537";
const redirect = 'http://localhost:3000/callback';
const url = `https://accounts.spotify.com/authorize`;
const client_secret = '6dc64516e2a2449cbc7c0bf6726b0fd0';

const scopes = [
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing"
];


const loginUrl = `${url}?client_id=${clientID}&response_type=code&redirect_uri=${redirect}&show_dialog=true&state=${state}&scope=${scopes.join(
  "%20"
)}`;

app.use(cors({
    origin:'*'
}),express.json());

app.get('/login', (req,res)=> {
    res.json(loginUrl);
})

app.post('/login', (req,res)=> {
    const code = req.body.code;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form:{
            code: code,
            redirect_uri: redirect,
            grant_type: 'authorization_code'
        },
        headers:{
            'Authorization':'Basic ' + (new Buffer.from(clientID + ':' + client_secret).toString('base64'))
        },
        json:true
    }
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
          res.json({access_token});
        } 
      });
})


app.post('/me',(req,res)=>{
    
    var access_token = req.body.token;
    let optionsForUser = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(optionsForUser, function(error, response, body) {
        var fullBody = body;
        let optionsForFavourites = {
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
        request.get(optionsForFavourites, function(error, response, body){
            fullBody = {...fullBody,...body};

            res.json(fullBody);
        })
    
    });
});

app.post('/top_favourite',(req,res)=>{
    var access_token = req.body.token;
    var searchType = req.body.type;
    var options = {
        url: 'https://api.spotify.com/v1/me/top/'+searchType,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(options, function(error, response, body) {
        
        var fullBody = body;
        if(searchType != 'tracks'){
            res.json(fullBody);
        }else{
        var id = body.items[0].id;
        var options = {
            url: 'https://api.spotify.com/v1/audio-features/'+id,
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        };
        request.get(options, function(error, response, body) {
            
            fullBody = {...fullBody,...body};
            res.json(fullBody);
            
            
        });
        }


    });
});



app.post('/top_favourite',(req,res)=>{
    var access_token = req.body.token;
    var searchType = req.body.type;
    var options = {
        url: 'https://api.spotify.com/v1/me/top/'+searchType,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
        var fullBody = body;
        if(searchType != 'tracks'){
            res.json(fullBody);
        }else{
        var id = body.items[0].id;
        var options = {
            url: 'https://api.spotify.com/v1/audio-features/'+id,
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        };
        request.get(options, function(error, response, body) {
            
            fullBody = {...fullBody,...body};
            res.json(fullBody);
            
            
        });
        }

    }
    res.json({error: 'Access Token Expired'});
    });
});

app.post('/song',(req,res)=>{
    var access_token = req.body.token;
    var id = req.body.id;
    var fullBody = {};
    var optionsForAnalysis = {
        url: 'https://api.spotify.com/v1/audio-features/'+id,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(optionsForAnalysis, function(error, response, body) {
        fullBody.analysis=body;
        var optionsForSong = {
            url: 'https://api.spotify.com/v1/tracks/'+id,
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
        request.get(optionsForSong, function(error, response, body) {
            fullBody.generalInfo=body;
            console.log(body);
            var optionsForDetails = {
                url: body.artists[0].href,
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
              };
            request.get(optionsForDetails, function(error, response, body) {
                fullBody.details=body;
                res.json(fullBody);
            });
        });
    });
    
});

app.post('/album',(req,res)=>{
    var access_token = req.body.token;
    var id = req.body.id;
    var options = {
        url: `https://api.spotify.com/v1/albums/`+id,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(options, function(error, response, body) {
        console.log(response.statusCode);
        res.json(body);
    });
});
app.post('/artist',(req,res)=>{
    var access_token = req.body.token;
    var id = req.body.id;
    var options = {
        url: `https://api.spotify.com/v1/artists/`+id,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(options, function(error, response, body) {
        console.log(response.statusCode);
        res.json(body);
    });
});




app.post('/search',(req,res)=>{
    var access_token = req.body.token;
    var query = req.body.query;
    var type = 'album,track,artist';
    var options = {
        url: `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=6`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(options, function(error, response, body) {
        console.log(response.statusCode);
        console.log(body);
        res.json(body);
    });
});

app.post('/get_top',(req,res)=>{
    var access_token = req.body.token;
    var options = {
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
    request.get(options, function(error, response, body) {
        console.log(response.statusCode);
        console.log(body);
        res.json(body);
    });
});



app.listen(port,()=>{
    console.log('Listening at localhost:'+port);
})