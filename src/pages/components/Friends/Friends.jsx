import { useContext, useEffect } from "react";
import FriendRequests from "./FriendRequests";
import SearchFriend from "./SearchFriend";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "src/pages/_app";
import SpecificTopic from "../SpecificTopic";

export default function Friends() {
  const { state, setState } = useContext(AppContext);

  useEffect(() => {}, [state]);

  const friendExpandHandler = (friend) => {
    setState((prevState) => ({ ...prevState, specificTopic: friend }));
  };

  return (
    <Box>
      {state.specificTopic ? (
        <SpecificTopic topicName={state?.specificTopic} />
      ) : (
        <VStack spacing={6}>
          <SearchFriend />
          <FriendRequests />
          <Heading size="lg">We list your friends here:</Heading>
          {state?.userInfo?.friends?.map((friend, ind) => (
            <Box key={ind} borderWidth="1px" borderRadius="md" p={4}>
              <Button colorScheme="teal" onClick={() => friendExpandHandler(friend)}>
                {friend}
              </Button>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
