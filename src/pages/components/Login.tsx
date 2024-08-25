import { use, useState } from "react";


export default function Login() {

  const [Username,setUsername] = useState();
  const [password,setPassword] =  useState()


   const handleSubmit = () =>{

    console.log("username:", Username);
    console.log("username:", password);

   }

   const handleChange =(event: any)=>{
    if(event.target.id==="username"){
      setUsername(event.target.value)
    }
    else if(event.target.id==="password"){
      setPassword(event.target.value)
    }
   }


    return (
      <>
        Login:
        <form onSubmit={handleSubmit}>

        <br/>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={Username} onChange={handleChange}/>
        <br/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={handleChange}/>
        <button type="submit">Login</button>
        </form>
      </>
    );
  }