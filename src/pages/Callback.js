import useAuth from "../useAuth";

//Handle Cancel on PopUp

const Callback = ()=>{
    const code = new URLSearchParams(window.location.search).get('code');
    const { login } = useAuth();

    window.onunload = ()=>{login().then(()=>window.opener.location.assign('/'))};
    fetch('http://localhost:8000/login', {
            method: 'POST',
            mode:'cors',
            headers:{
              'Content-Type': 'application/json'
              },
            body: JSON.stringify({code: code})
          }).then(res=>res.json())
            .then(data=>window.localStorage.setItem("token",data.access_token))
            .then(()=>{
              window.close()
            });
    
    return <>
    </>
}
export default Callback;