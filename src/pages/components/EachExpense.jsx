import axios from "axios";
import { useContext } from "react";
import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { AppContext } from "../_app";

export default function EachExpense({ topicName, expensesData = [], fetchAllExpenses }) {
  const { credentials } = useContext(AppContext);
  const { userName } = credentials;

  const handleDeleteExpense = async (expenseID) => {
    let response = await axios.post('/api/deleteOneExpense', {
      userName,
      expenseWith: topicName,
      expenseID
    });
    alert(response.data.message);
    fetchAllExpenses();
  };

  return (
    <VStack spacing={4} align="stretch">
      {expensesData?.length > 0 ? (
        expensesData.map((eachItem, ind) => (
          <Box
            key={ind}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.50"
            boxShadow="sm"
            w="100%"
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
              <Text fontWeight="bold">Is Lent:</Text>
              <Text>{eachItem.expensePaidBy === userName ? "Yes" : "No"}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Is Equal Split:</Text>
              <Text>{eachItem.isEqualSplit ? "Yes" : "No"}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Total Amount:</Text>
              <Text>{eachItem.totalAmount}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">Your Share:</Text>
              <Text>{eachItem?.unEqualSplit[userName]}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text fontWeight="bold">{topicName}'s Share:</Text>
              <Text>{eachItem?.unEqualSplit[topicName]}</Text>
            </HStack>

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
