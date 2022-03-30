import spotifylogo from '../assets/SpotifyLogo.png'
const LoginPage = ()=>{

const promtLogin = async ()=>{
    let res = await fetch('http://localhost:8000/login');
    let data = await res.json();
    window.open(await data,'Login with Spotify','width=800,height=600');
}
    return <div className="loginPage">
        <img src={spotifylogo}></img>
        <div>
            <h1>Get detailed analysis of your favourite songs!</h1>
            <button onClick={()=>{promtLogin()}}><h2>Login</h2></button>
        </div>
    </div>
}

export default LoginPage;
