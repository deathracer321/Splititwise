import { useContext, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "../_app";

export default function AddExpense({ expenseWith, onAddExpense }) {
  const { credentials } = useContext(AppContext);
  const { userName } = credentials;

  const initialState = {
    desc: "",
    amount: "",
    expensePaidBy: userName,
    unEqualSplit: {
      [userName]: undefined,
      [expenseWith]: undefined,
    },
    isEqualSplit: true,
  };

  const [expense, setExpense] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "isEqualSplit") {
      setExpense((prev) => ({
        ...prev,
        isEqualSplit: JSON.parse(value),
      }));
    } else if (name === "unEqualSplitUser") {
      setExpense((prev) => ({
        ...prev,
        unEqualSplit: {
          ...prev.unEqualSplit,
          [userName]: value,
        },
      }));
    } else if (name === "unEqualSplitFriend") {
      setExpense((prev) => ({
        ...prev,
        unEqualSplit: {
          [expenseWith]: value,
        },
      }));
    } else {
      setExpense((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getRemainingAmount = () => {
    let remaining =
      parseInt(expense.amount) -
      (parseInt(expense.unEqualSplit[userName]) + parseInt(expense.unEqualSplit[expenseWith]));
    return remaining || remaining === 0 ? remaining : "Please fill";
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (expense.isEqualSplit || getRemainingAmount() === 0) {
      const newExpense = { expense, userName, expenseWith };
      onAddExpense(newExpense);
      setExpense(initialState);
    } else {
      alert("Make sure unequal splits sum up to total amount");
    }
  };

  return (
    <Box border="2px solid black" p="10px" mb="10px" borderRadius="8px">
      <Text textAlign="center" fontSize="xl" mb="4">
        Add your expense with {expenseWith} here:
      </Text>
      <form onSubmit={handleAddExpense}>
        <VStack spacing={4} align="stretch">
          <FormControl id="desc" isRequired>
            <FormLabel>Description:</FormLabel>
            <Input
              type="text"
              value={expense.desc}
              name="desc"
              placeholder="Enter description"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="amount" isRequired>
            <FormLabel>Amount:</FormLabel>
            <Input
              type="number"
              value={expense.amount}
              name="amount"
              placeholder="Enter amount"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="paidBy">
            <FormLabel>Paid By:</FormLabel>
            <Select name="expensePaidBy" value={expense.expensePaidBy} onChange={handleChange}>
              <option value={userName}>{userName}</option>
              <option value={expenseWith}>{expenseWith}</option>
            </Select>
          </FormControl>

          <FormControl id="split">
            <FormLabel>Split:</FormLabel>
            <Select name="isEqualSplit" value={expense.isEqualSplit} onChange={handleChange}>
              <option value={true}>Equally</option>
              <option value={false}>Unequally</option>
            </Select>
          </FormControl>

          {!expense.isEqualSplit && (
            <>
              <FormControl id="unEqualSplitUser" isRequired>
                <FormLabel>Your share:</FormLabel>
                <Input
                  type="number"
                  name="unEqualSplitUser"
                  value={expense.unEqualSplit[userName]}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="unEqualSplitFriend" isRequired>
                <FormLabel>Friend&apos;s share:</FormLabel>
                <Input
                  type="number"
                  name="unEqualSplitFriend"
                  value={expense.unEqualSplit[expenseWith]}
                  onChange={handleChange}
                />
              </FormControl>

              <Text color={getRemainingAmount() === 0 ? "green.500" : "red.500"}>
                Remaining Amount: {getRemainingAmount()}
              </Text>
            </>
          )}

          <Button type="submit" colorScheme="teal" size="md" width="full">
            Add Expense
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
