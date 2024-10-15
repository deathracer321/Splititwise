import axios from 'axios';
import floorToTwoDecimal from '../../components/utils';
import { useContext } from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { AppContext } from 'src/pages/_app';

export default function EachExpense({ groupMembers = [], groupData = [], fetchAllExpenses, groupName }) {
  const expensesData = groupData.expenses;

  const { credentials } = useContext(AppContext);
  const { userName, password } = credentials;

  const handleDeleteExpense = async (expenseID) => {
    let response = await axios.post('/api/groups/deleteOneExpense', {
      userName: userName,
      password: password,
      groupName: groupName,
      expenseID: expenseID
    });
    alert(response.data.message);
    fetchAllExpenses();
  };

  return (
    <VStack spacing={4} align="stretch" width="100%">
      {expensesData?.length > 0 ? (
        expensesData.map((eachItem, ind) => (
          <Box
            key={ind}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.50"
            boxShadow="sm"
            width="100%"
          >
            <HStack justify="space-between">
              <Text fontWeight="bold">Date:</Text>
              <Text>{new Date(eachItem.dateAdded).toLocaleDateString("en-GB")}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Expense Name:</Text>
              <Text>{eachItem.expenseTitle}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Paid By:</Text>
              <Text>{eachItem.expensePaidBy}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Is Equal Split?</Text>
              <Text>{eachItem.isEqualSplit ? "Yes" : "No"}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Total Amount:</Text>
              <Text>{eachItem.totalAmount}</Text>
            </HStack>

            <Box>
              <Text fontWeight="bold">Split Details:</Text>
              {groupMembers.map((member) => (
                <HStack key={member} justify="space-between">
                  <Text>{member}:</Text>
                  <Text
                    color={
                      eachItem.expensePaidBy === member ? 'green.500' : 'red.500'
                    }
                  >
                    {floorToTwoDecimal(eachItem?.unEqualSplit?.[member] || 'N/A')}
                  </Text>
                </HStack>
              ))}
            </Box>

            <Button
              mt={4}
              colorScheme="red"
              onClick={() => handleDeleteExpense(eachItem.expenseID)}
            >
              Delete
            </Button>
          </Box>
        ))
      ) : (
        <Text>No expenses to show.</Text>
      )}
    </VStack>
  );
}
