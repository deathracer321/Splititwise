import { useContext } from "react";
import { Box, Button, VStack, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { AppContext } from "src/pages/_app";
import fetchAndSyncUserInfo from "../../../lib/fetchAndSyncUserInfo";

export default function FriendRequests() {
  const { state, setState, credentials } = useContext(AppContext);
  const { userName, password } = credentials;

  const acceptFriendRequestHandler = async (whomToAcceptOrReject) => {
    try {
      const response = await axios.post("/api/acceptFriendReq", {
        userName: userName,
        password: password,
        whomToAcceptOrReject: whomToAcceptOrReject,
        action: "accept"
      });

      if (response.data.message === "Friend request accepted") {
        alert(response.data.message);
        const updatedUserInfo = await fetchAndSyncUserInfo(userName, password);
        setState(updatedUserInfo);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred while accepting the friend request.");
    }
  };

  const rejectFriendRequestHandler = async (whomToAcceptOrReject) => {
    try {
      const response = await axios.post("/api/acceptFriendReq", {
        userName: userName,
        password: password,
        whomToAcceptOrReject: whomToAcceptOrReject,
        action: "reject"
      });

      if (response.data.message === "Friend request rejected") {
        alert(response.data.message);
        const updatedUserInfo = await fetchAndSyncUserInfo(userName, password);
        setState(updatedUserInfo);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred while rejecting the friend request.");
    }
  };

  if (!state?.userInfo?.friendReqs || state.userInfo.friendReqs.length === 0) {
    return <Text>No Friend requests you have! Enjoy...</Text>;
  }

  return (
    <Box>
      <Heading size="md">We list your friend requests here</Heading>
      <UnorderedList mt={4}>
        {state.userInfo.friendReqs.map((friendReq, ind) => (
          <ListItem key={ind} border="1px solid gray" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>{friendReq}</Heading>
            <VStack spacing={2}>
              <Button colorScheme="green" onClick={() => acceptFriendRequestHandler(friendReq)}>
                Accept
              </Button>
              <Button colorScheme="red" onClick={() => rejectFriendRequestHandler(friendReq)}>
                Reject
              </Button>
            </VStack>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
