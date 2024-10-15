import axios from "axios";
import { useState, useContext } from "react";
import { Box, Button, FormControl, Input, Heading, VStack } from "@chakra-ui/react";
import DisplayGroups from './DisplayGroups';
import { AppContext } from "src/pages/_app";
import SpecificGroup from "./SpecificGroup";

export default function Groups() {
  const { state, setState, credentials } = useContext(AppContext);
  const { userName, password } = credentials;
  const [groups, setGroups] = useState({});
  const [groupName, setGroupName] = useState('');

  const createNewGroupHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/groups/createGroup', {
      userName: userName,
      password: password,
      groupName: groupName,
    });
    alert(response.data.message);
    setGroupName("");
    getMyGroups();
  };

  const newGroupNameHandler = (e) => {
    setGroupName(e.target.value);
  };

  const getMyGroups = async () => {
    const usersGroupsData = await axios.post('/api/groups/getMyGroups', {
      userName: userName,
      password: password,
    });
    setGroups(usersGroupsData.data);
  };

  return (
    <>
      {state.specificGroup ? (
        <SpecificGroup topicName={state?.specificGroup} />
      ) : (
        <Box mt={10}>
          <VStack spacing={6} align="stretch">
            <form onSubmit={createNewGroupHandler}>
              <FormControl display="flex" alignItems="center">
                <Input
                  id="newGroupInput"
                  type="text"
                  placeholder="Enter new group name"
                  value={groupName}
                  onChange={newGroupNameHandler}
                  required
                  bg="white"
                  borderRadius="md"
                  mr={4}
                />
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  borderRadius="full"
                  rightIcon={<i className="bi bi-plus"></i>}
                >
                  Create
                </Button>
              </FormControl>
            </form>

            <Heading size="sm" textAlign="left">
              Your groups :
            </Heading>

            <DisplayGroups getMyGroups={getMyGroups} groups={groups} />
          </VStack>
        </Box>
      )}
    </>
  );
}
