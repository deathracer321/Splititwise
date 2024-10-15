import axios from "axios";
import { useState, useContext } from "react";
import { AppContext } from "src/pages/_app.jsx";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo.js";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";

export default function AddFriendToGroup({ groupName, fetchAllExpenses }) {
  const [searchString, setSearchString] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const { state, setState } = useContext(AppContext);
  const { credentials } = useContext(AppContext);
  const { userName, password } = credentials;
  const toast = useToast(); // Using Chakra UI's toast for alerts

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
    setShowAddFriend(false);
  };

  const handleSearch = async () => {
    if (searchString) {
      let { data } = await axios.get(`./api/searchFriend?userName=${searchString}`);
      if (data.message === "Friend exists") {
        setShowAddFriend(true);
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        toast({
          title: request.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        const updatedGroupInfo = await fetchAndSyncUserInfo(userName, password);
        setState((prevState) => ({
          ...prevState,
          updatedGroupInfo,
        }));
        fetchAllExpenses(); // Fetch updated group data
      } else {
        toast({
          title: request.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "You can't send a request to yourself.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    setSearchString("");
    setShowAddFriend(false);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50" w="100%" maxW="400px" mx="auto" boxShadow="md">
      <Heading as="h3" size="md" mb={4}>
        Search Friends Here
      </Heading>
      <VStack spacing={4}>
        <Input
          type="text"
          placeholder="Type here..."
          value={searchString}
          onChange={handleSearchChange}
        />
        <Button
          onClick={handleSearch}
          isDisabled={!searchString}
          colorScheme="blue"
          w="full"
        >
          Search
        </Button>
        {showAddFriend && (
          <Button
            colorScheme="green"
            w="full"
            onClick={sendFriendRequestHandler}
          >
            Add {searchString} to {groupName.split("_")[1]}?
          </Button>
        )}
      </VStack>
    </Box>
  );
}
