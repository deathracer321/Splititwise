import { useRouter } from "next/router"
import { useEffect } from "react"
export default function Dashboard(){

    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem("userName")
        sessionStorage.removeItem("password")
        router.push('./Login')
    }

    useEffect(()=>{
        if(!sessionStorage.getItem("userName")){
          router.push("./Login")
        }
      },[])

    return <>Welcome to Dashboard
    <button onClick={handleLogout}>Logout</button>
    </>
}