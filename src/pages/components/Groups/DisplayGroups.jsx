import axios from "axios"
import { useEffect, useState } from "react"



export default function DisplayGroups(){

    const [groups,setGroups] = useState({})

    const getMyGroups = async ()=>{
        const usersGroupsData = await axios.post('/api/groups/getMyGroups',{
            userName : sessionStorage.getItem("userName"),
            password : sessionStorage.getItem("password")
        })
        setGroups(usersGroupsData.data)
    }

    useEffect(()=>{
       getMyGroups()
    },[])

    return <>
    Here we display all the groups that you are in:
    <ul>
    {groups?.userGroups?.map((group)=>{
        return <li>{group}</li>
    })}
    </ul>
    </>
}