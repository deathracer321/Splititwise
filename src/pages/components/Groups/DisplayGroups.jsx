import axios from "axios"
import { useEffect, useState,useContext } from "react"
import { AppContext } from "src/pages";


export default function DisplayGroups(){
    const { state, setState } = useContext(AppContext);
    const [groups,setGroups] = useState({})

    const getMyGroups = async ()=>{
        const usersGroupsData = await axios.post('/api/groups/getMyGroups',{
            userName : sessionStorage.getItem("userName"),
            password : sessionStorage.getItem("password")
        })
        setGroups(usersGroupsData.data)
    }

    const handleSpecificGroup = (group) => {
        setState((prevState) => ({ ...prevState, specificGroup: group }));
      };

    useEffect(()=>{
       getMyGroups()
    },[])

    return <>
    Here we display all the groups that you are in:
    <ul>
    {groups?.userGroups?.map((group,ind)=>{
        return <li key={ind}><button onClick={()=>handleSpecificGroup(group)}>{group}</button></li>
    })}
    </ul>
    </>
}