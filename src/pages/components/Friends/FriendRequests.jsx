import axios from "axios";
import { useContext } from "react";
import { AppContext } from "src/pages/_app.jsx";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo.js";

export default function FriendRequests() {
  const { state, setState, credentials } = useContext(AppContext);
  const {userName, password} = credentials 
  
  const acceptFriendRequestHandler = async (whomToAcceptOrReject) => {
    try {
      // Send friend request acceptance to the server
      const response = await axios.post("/api/acceptFriendReq", {
        userName: userName,
        password: password,
        whomToAcceptOrReject: whomToAcceptOrReject,
        action:"accept"
      });

      if (response.data.message === "Friend request accepted") {
        alert(response.data.message);

        // Fetch updated user info and update state
        const updatedUserInfo = await fetchAndSyncUserInfo(userName, password);
        setState(updatedUserInfo); // Now update state after getting the new data
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("An error occurred while accepting the friend request.");
    }
  };

  const rejectFriendRequestHandler = async (whomToAcceptOrReject) => {
    try {
      // Send friend request acceptance to the server
      const response = await axios.post("/api/acceptFriendReq", {
        userName: userName,
        password: password,
        whomToAcceptOrReject: whomToAcceptOrReject,
        action:"reject"
      });

      if (response.data.message === "Friend request rejected") {
        alert(response.data.message);

        // Fetch updated user info and update state
        const updatedUserInfo = await fetchAndSyncUserInfo(userName, password);
        setState(updatedUserInfo); // Now update state after getting the new data
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      alert("An error occurred while rejecting the friend request.");
    }
  };

  // Avoid rendering until state is available
  if (!state?.userInfo?.friendReqs || state.userInfo.friendReqs.length === 0) {
    return <p>No Friend requests you have! Enjoy...</p>;
  }

  return (
    <>
      <h1>We list your friend requests here</h1>
      <ul>
        {state.userInfo.friendReqs.map((friendReq, ind) => (
          <li key={ind} style={{ border: "2px solid grey" }}>
            <h4>{friendReq}</h4>
            <button onClick={() => acceptFriendRequestHandler(friendReq)}>
              Accept
            </button>
            <button onClick={() => rejectFriendRequestHandler(friendReq)}>Reject</button>
          </li>
        ))}
      </ul>
    </>
  );
}
