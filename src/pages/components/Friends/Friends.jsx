import { useContext, useEffect } from 'react'
import FriendRequests from './FriendRequests'
import SearchFriend from './SearchFriend'
import { AppContext } from "src/pages";
export default function Friends(){

    const {state,setState} = useContext(AppContext)

    useEffect(()=>{

    },[state])

    return <>
        <SearchFriend/>
        <FriendRequests/>
    <h1>We list your friends here:</h1>
        {
            state?.userInfo?.friends?.map((friend)=>{
                return <p>
                    {friend}
                </p>
            })
        }
    </>
}