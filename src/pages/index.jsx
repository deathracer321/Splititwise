import Dashboard from "./components/Dashboard"
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function Home() {

  
  const [state,setState] = useState({})
  
  useEffect(()=>{
    setState(JSON.parse(localStorage.getItem('userInfo')) || {})
  },[])

  return (
    <main>
      <AppContext.Provider value={{state,setState}}>
        <Dashboard/>
      </AppContext.Provider>
    </main>
  );
}


