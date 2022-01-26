import React from "react";
import './Button.css';

const Login = ()=>{
    const handleLogin=()=>{
        fetch('http://localhost:8000/login').then(res=>res.json()).then(data=>{window.open(data,'Login with Spotify',
        'width=800,height=600')})
    }
    return <div className='Btn' onClick={handleLogin}>Login</div>
    
}
export default Login;