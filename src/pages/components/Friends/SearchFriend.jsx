import { useState, useContext } from "react";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";
import { AppContext } from "src/pages/_app";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo";

export default function SearchFriend() {
  const [searchString, setSearchString] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const { state, setState } = useContext(AppContext);
  const { credentials } = useContext(AppContext);
  const { userName, password } = credentials;

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
    setShowAddFriend(false);
  };

  const handleSearch = async () => {
    if (searchString) {
      let data = await axios.get(`./api/searchFriend?userName=${searchString}`);
      if (data.data.message === 'Friend exists') {
        setShowAddFriend(true);
      } else {
        alert(data.data.message);
        setShowAddFriend(false);
      }
    }
  };

  const sendFriendRequestHandler = async () => {
    if (searchString !== userName) {
      let request = await axios.post('./api/sendFriendRequest', {
        requestedUsername: searchString,
        myUsername: userName,
        password: password
      });
      if (request.data.message === 'Successfully friend request sent!') {
        alert(request.data.message);
        const updatedUserInfo = await fetchAndSyncUserInfo(userName, password);
        setState(updatedUserInfo);
      } else {
        alert(request.data.message);
      }
    } else {
      alert("How can you give request to yourself?");
    }
    setSearchString('');
    setShowAddFriend(false);
  };

  return (
    <Box>
      <Heading size="md">Search Friends here</Heading>
      <VStack spacing={4} mt={4}>
        <Input
          placeholder="Type here..."
          value={searchString}
          onChange={handleSearchChange}
        />
        <Button colorScheme="teal" onClick={handleSearch} disabled={!searchString}>
          Search
        </Button>
        {showAddFriend && (
          <Button colorScheme="green" onClick={sendFriendRequestHandler}>
            Add {searchString} as Friend?
          </Button>
        )}
      </VStack>
    </Box>
  );
}
