import { useEffect, useContext } from "react";
import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";
import { AppContext } from "src/pages/_app";

export default function DisplayGroups({ getMyGroups, groups }) {
  const { state, setState } = useContext(AppContext);

  const handleSpecificGroup = (group) => {
    setState((prevState) => ({ ...prevState, specificGroup: group }));
  };

  useEffect(() => {
    getMyGroups();
  }, []);

  return (
    <Box>
      <List spacing={3}>
        {groups?.userGroups?.map((group, ind) => (
          <ListItem key={ind}>
            <Button
              onClick={() => handleSpecificGroup(group)}
              variant="outline"
              colorScheme="teal"
              w="full"
            >
              {group.split('_')[1]}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
