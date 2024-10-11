import axios from "axios";
import { useState ,useContext} from "react";
import { AppContext } from "src/pages";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo.js";
export default function AddFriendToGroup({groupName}){
    const [searchString,setSearchString] = useState('');
    const [showAddFriend,setShowAddFriend] = useState(false);
    const { state, setState } = useContext(AppContext);
    const handleSearchChange = (e) =>{
        setSearchString(e.target.value)
        setShowAddFriend(false)
    }

    const handleSearch = async (e) =>{
        if(searchString){
            let data = await axios.get(`./api/searchFriend?userName=${searchString}`)
            if(data.data.message === 'Friend exists'){
                setShowAddFriend(true)
            }else{
                alert(data.data.message )
                setShowAddFriend(false)
            }
        }
    }

    const sendFriendRequestHandler = async () =>{
        const userName = sessionStorage.getItem("userName");
        const password = sessionStorage.getItem("password");
        if(searchString !== sessionStorage.getItem('userName')){
            let request = await axios.post('./api/groups/addFriendToGroup',{
                requestedUsername : searchString,
                myUsername : sessionStorage.getItem('userName'),
                password : sessionStorage.getItem('password'),
                groupName : groupName
            })
            if(request.data.message === 'Added friend to Group Successfully'){
                alert(request.data.message)
                 // Fetch updated user info and update state
                 const updatedGroupInfo = await fetchAndSyncUserInfo(userName, password);
                    setState((prevState)=> {
                        return {...prevState,updatedGroupInfo:updatedGroupInfo}}) // Now update state after getting the new data
            }else{
                alert(request.data.message)
            }
        }else{
            alert("How can you give request to you yourself?")
        }
        setSearchString('')
        setShowAddFriend(false)
    }

    return <>
    <h1>Search Friends here</h1>
    <input type="text" placeholder="type here..." value={searchString} onChange={handleSearchChange}/>
    <button onClick={handleSearch} disabled={!searchString}> Search</button>
    <br/>
    {
        showAddFriend &&
    <button style={{backgroundColor:"green"}} onClick={sendFriendRequestHandler}>Add {searchString} to {groupName}?</button>
        }
    </>
}