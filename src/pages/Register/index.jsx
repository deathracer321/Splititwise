import { useState,useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SignUp() {

  const [userName,setUsername] = useState('');
  const [password,setPassword] =  useState('')
  const [confirmPassword,setConfirmPassword] =  useState('')
  const [enableSignUp,setEnableSignUp] =  useState('')
  const router = useRouter();


  useEffect(() => {
    // Enable the Sign Up button only if the passwords match and are not empty
    setEnableSignUp(password !== '' && confirmPassword !== '' && password === confirmPassword);
  }, [password, confirmPassword]);

   const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        let data = await axios.post('./api/signup',{
            "userName" : userName,
            "password" : password
        })
        alert(data.data.message)
        if(data.data.message==="User created successfully"){
          router.push('/Login')
        }else if(data.data.message==='User already exists. Please log in.'){
          router.push('/Login')
        }
    } catch(error){
        alert(error)
    }

   }

   const handleChange =(event)=>{
    if(event.target.id==="userName"){
      setUsername(event.target.value)
    }
    else if(event.target.id==="password"){
      setPassword(event.target.value);
    }
    else if(event.target.id==="confirmPassword"){
      setConfirmPassword(event.target.value)
    }
   }


    return (
      <>
        <h1>Signup:</h1>
        <form onSubmit={handleSubmit}>
        <br/>
        <label htmlFor="userName">Username</label>
        <input id="userName" type="text" value={userName} onChange={handleChange}/>
        <br/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={handleChange}/>
        <br/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        
        <input id="confirmPassword" type="text" value={confirmPassword} onChange={handleChange}/>
        {enableSignUp ? "" : <p style={{color:"red"}}>Password doesnt match</p>}
        <br/>
        <br/>
        <button type="submit" disabled={!enableSignUp}>Signup</button>
        </form>
        
        <br/><br/><br/>
        
        <h4>Already have an account?</h4>
        
        <button onClick={()=>router.push('/Login')}>Login</button>
      </>
    );
  }