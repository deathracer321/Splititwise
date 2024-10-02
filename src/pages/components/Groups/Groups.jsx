import axios from "axios"
import { useEffect, useState } from "react"
import DisplayGroups from './DisplayGroups'

export default function Groups(){

    const [groupName,setGroupName] = useState('')

    const createNewGroupHandler = async (e) =>{
        e.preventDefault();
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
        setGroupName("")
    }

    const newGroupNameHandler = (e) =>{
        setGroupName(e.target.value)
    }


    return <>
    <br/>
    <br/>
    <br/>
    <form onSubmit={createNewGroupHandler}>

    <label style={{border:"1px solid black"}} htmlFor="newGroupInput">
    <input type="text" required={true} value={groupName} onChange={newGroupNameHandler}/>

    <button id="newGroupInput" className="btn btn-primary rounded-circle" style={{ width: '100px', height: '100px' }}>
        Create group<i className="bi bi-plus"></i>
      </button>
    </label>
    </form>
    <br/>
    <br/>
    <h1>We list your groups here</h1>
    <DisplayGroups/>
    </>
}