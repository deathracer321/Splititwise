import { useState,useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

export default function SignUp() {

  const [userName,setUsername] = useState('');
  const [password,setPassword] =  useState('')
  const router = useRouter();

  useEffect(()=>{
    if(sessionStorage.getItem("userName")){
      router.push("./")
    }
  },[router])

   const handleSubmit = async (e:any) =>{
    e.preventDefault();
    try{
        let data = await axios.post('./api/login',{
            "userName" : userName,
            "password" : password
        })
        if(data.data.message==="Logged in successfully"){
          sessionStorage.setItem("userName",userName)
          sessionStorage.setItem("password",password)
          localStorage.setItem("userInfo",JSON.stringify(data.data))
          router.push("./")
        }else{
          alert(data.data.message)
        }
    } catch(error){
        alert(error)
    }

   }

   const handleChange =(event: any)=>{
    if(event.target.id==="userName"){
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
        <label htmlFor="userName">Username</label>
        <input id="userName" type="text" value={userName} onChange={handleChange}/>
        <br/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={handleChange}/>
        <button type="submit">Login</button>
        </form>

        <br/><br/><br/>
        
        <h6>Create an account?</h6>
        <button onClick={()=>router.push('/Register')}>Signup</button>
      </>
    );
  }