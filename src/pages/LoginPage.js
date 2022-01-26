import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react/cjs/react.development";


const LoginPage = ()=>{

const promtLogin = async ()=>{
    let res = await fetch('http://localhost:8000/login');
    let data = await res.json();
    window.open(await data,'Login with Spotify','width=800,height=600');
}
    return <div>
    <h1>Login Page</h1>
    <button onClick={()=>{promtLogin()}}>Please Log in</button>
    </div>
}

export default LoginPage;
