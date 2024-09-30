import axios from "axios"

// when this function is called, it justs runs the login again and fetches userdata and updates the localstorage and rerenders the dom
export default async function fetchAndSyncUserInfo(userName,password){

    let data = await axios.post('./api/login',{
        "userName" : userName,
        "password" : password
    })
    if(data.data.message==="Logged in successfully"){
         localStorage.setItem("userInfo",JSON.stringify(data.data))
         return data.data
      }else{
        alert(data.data.message)
      }

}