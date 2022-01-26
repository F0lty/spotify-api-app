import * as React from "react";
const authContext = React.createContext();

//Change to session storage!

function useAuth() {

  //ADD CHEK-UP OF LOCAL STORAGE

  const [authed, setAuthed] = React.useState(localStorage.getItem('token'));
  console.log(localStorage.getItem('token'));
  return {
    authed,
    login() {                                //add token for now
      return new Promise((res) => {
        setAuthed(localStorage.getItem('token'));
        res();
      });
    },
    logout() {                                 //remove token from localStorage
      return new Promise((res) => {
        window.localStorage.removeItem('token');
        setAuthed(null);
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}