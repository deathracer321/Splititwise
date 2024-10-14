import Dashboard from "./components/Dashboard"
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function Home() {

  
  const [state,setState] = useState({})
  
  const [credentials,setCredentials] = useState({
    userName : '',
    password : ''
  })

  useEffect(()=>{
    setState(JSON.parse(localStorage.getItem('userInfo')) || {})
    setCredentials({
      userName : sessionStorage.getItem('userName'),
      password : sessionStorage.getItem('password'),
    })
  },[])

  return (
    <main>
      <AppContext.Provider value={{state,setState,credentials,setCredentials}}>
        <Dashboard/>
      </AppContext.Provider>
    </main>
  );
}


