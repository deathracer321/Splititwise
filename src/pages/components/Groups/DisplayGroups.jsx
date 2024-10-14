import axios from "axios"
import { useEffect, useState,useContext } from "react"
import { AppContext } from "src/pages";


export default function DisplayGroups({getMyGroups,groups}){
    const { state, setState } = useContext(AppContext);

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
        return <li key={ind}><button onClick={()=>handleSpecificGroup(group)}>{group.split('_')[1]}</button></li>
    })}
    </ul>
    </>
}