import axios from "axios"
import { useEffect, useState } from "react"
import DisplayGroups from './DisplayGroups'

export default function Groups(){

    const [groupName,setGroupName] = useState('')

    const createNewGroupHandler = async () =>{
        const response  = await axios.post('/api/groups/createGroup',{
            userName : sessionStorage.getItem('userName'),
            password : sessionStorage.getItem('password'),
            groupName : groupName
        })
        if(response.data.message==="Group created successfully!"){
            alert(response.data.message)
        }else{
            alert(response.data.message)
        }
    }

    const newGroupNameHandler = (e) =>{
        setGroupName(e.target.value)
    }


    return <>
    <br/>
    <br/>
    <br/>
    <label style={{border:"1px solid black"}} htmlFor="newGroupInput">
    <input type="text" value={groupName} onChange={newGroupNameHandler}/>

    <button onClick={createNewGroupHandler} id="newGroupInput" className="btn btn-primary rounded-circle" style={{ width: '100px', height: '100px' }}>
        Create group<i className="bi bi-plus"></i>
      </button>
    </label>
    <br/>
    <br/>
    <h1>We list your groups here</h1>
    <DisplayGroups/>
    </>
}