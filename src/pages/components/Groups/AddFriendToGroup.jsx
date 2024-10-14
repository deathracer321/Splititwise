import axios from "axios";
import { useState, useContext } from "react";
import { AppContext } from "src/pages/_app.jsx";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo.js";
export default function AddFriendToGroup({ groupName, fetchAllExpenses }) {
  const [searchString, setSearchString] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const { state, setState } = useContext(AppContext);
  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
    setShowAddFriend(false);
  };
  const {credentials} = useContext(AppContext)
  const {userName,password} = credentials;

  const handleSearch = async (e) => {
    if (searchString) {
      let data = await axios.get(`./api/searchFriend?userName=${searchString}`);
      if (data.data.message === "Friend exists") {
        setShowAddFriend(true);
      } else {
        alert(data.data.message);
        setShowAddFriend(false);
      }
    }
  };

  const sendFriendRequestHandler = async () => {
    if (searchString !== userName) {
      let request = await axios.post("./api/groups/addFriendToGroup", {
        requestedUsername: searchString,
        myUsername: userName,
        password: password,
        groupName: groupName,
      });
      if (request.data.message === "Added friend to Group Successfully") {
        alert(request.data.message);
        // Fetch updated user info and update state
        const updatedGroupInfo = await fetchAndSyncUserInfo(userName, password);
        setState((prevState) => {
          return { ...prevState, updatedGroupInfo: updatedGroupInfo };
        }); // Now update state after getting the new data
        //below fetch is to fetch all group data and this allows to render other components correctly
        fetchAllExpenses()
      } else {
        alert(request.data.message);
      }
    } else {
      alert("How can you give request to you yourself?");
    }
    setSearchString("");
    setShowAddFriend(false);
  };

  return (
    <>
      <h3>Search Friends here</h3>
      <input
        type="text"
        placeholder="type here..."
        value={searchString}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch} disabled={!searchString}>
        {" "}
        Search
      </button>
      <br />
      {showAddFriend && (
        <button
          style={{ backgroundColor: "green" }}
          onClick={sendFriendRequestHandler}
        >
          Add {searchString} to {groupName.split('_')[1]}?
        </button>
      )}
    </>
  );
}
