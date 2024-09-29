import axios from "axios";
import { useState } from "react"
export default function SearchFriend(){
    const [searchString,setSearchString] = useState('');
    const [showAddFriend,setShowAddFriend] = useState(false);

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

    return <>
    <h1>Search Friends here</h1>
    <input type="text" placeholder="type here..." value={searchString} onChange={handleSearchChange}/>
    <button onClick={handleSearch} disabled={!searchString}> Search</button>
    <br/>
    {
        showAddFriend &&
    <button style={{backgroundColor:"green"}}>Add {searchString} as Friend?</button>
        }
    </>
}