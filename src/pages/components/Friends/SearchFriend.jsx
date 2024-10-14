import axios from "axios";
import { useState ,useContext, useEffect} from "react";
import { AppContext } from "src/pages/_app.jsx";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo.js";
export default function SearchFriend(){
    const [searchString,setSearchString] = useState('');
    const [showAddFriend,setShowAddFriend] = useState(false);
    const { state, setState } = useContext(AppContext);
    const {credentials,setCredentials} = useContext(AppContext)

    const {userName,password} = credentials;
    
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
        if(searchString !== userName){
            let request = await axios.post('./api/sendFriendRequest',{
                requestedUsername : searchString,
                myUsername :userName,
                password : password
            })
            if(request.data.message === 'Successfully friend request sent!'){
                alert(request.data.message)
                 // Fetch updated user info and update state
                 const updatedUserInfo = await fetchAndSyncUserInfo(userName, password);
                    setState(updatedUserInfo); // Now update state after getting the new data
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
    <button style={{backgroundColor:"green"}} onClick={sendFriendRequestHandler}>Add {searchString} as Friend?</button>
        }
    </>
}