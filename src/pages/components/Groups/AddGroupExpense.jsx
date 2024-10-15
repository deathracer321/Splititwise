import { useState, useEffect, useContext } from "react";
import { Box, Input, Select, Button, Text } from "@chakra-ui/react";
import { AppContext } from "src/pages/_app";

export default function AddExpense({ expenseWith, onAddExpense, groupName }) {
  const { credentials } = useContext(AppContext);
  const { userName } = credentials;

  const initialState = {
    desc: "",
    amount: "",
    expensePaidBy: userName,
    unEqualSplit: {},
    isEqualSplit: true, // Default to equal split
  };

  const [expense, setExpense] = useState(initialState);

  const handleEqualSplit = (totalAmount) => {
    const equalAmount = totalAmount / expenseWith.length;
    const updatedUnEqualSplit = {};
    expenseWith.forEach((member) => {
      updatedUnEqualSplit[member] = equalAmount;
    });
    return updatedUnEqualSplit;
  };

  useEffect(() => {
    if (expense.isEqualSplit && expense.amount) {
      const updatedSplit = handleEqualSplit(expense.amount);
      setExpense((prev) => ({
        ...prev,
        unEqualSplit: updatedSplit,
      }));
    }
  }, [expense.isEqualSplit, expense.amount]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "isEqualSplit") {
      setExpense((prev) => ({
        ...prev,
        isEqualSplit: JSON.parse(value),
      }));
    } else if (name.startsWith("unEqualSplit")) {
      const memberName = name.split("-")[1];
      setExpense((prev) => ({
        ...prev,
        unEqualSplit: {
          ...prev.unEqualSplit,
          [memberName]: value,
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
    let totalSplit = Object.values(expense.unEqualSplit).reduce(
      (acc, split) => acc + parseInt(split || 0),
      0
    );
    let remaining = parseInt(expense.amount) - totalSplit;
    return remaining || remaining === 0 ? remaining : "Please fill";
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (expense.isEqualSplit || getRemainingAmount() === 0) {
      onAddExpense(expense);
      setExpense(initialState);
    } else {
      alert("Make sure unequal splits sum up to the total amount.");
    }
  };

  return (
    <Box border="2px" borderColor="black" p={4} rounded="md">
      <Text fontWeight="bold">Add your expense with {groupName.split("_")[1]} here:</Text>
      <form onSubmit={handleAddExpense}>
        <Input placeholder="Description" value={expense.desc} name="desc" required onChange={handleChange} mb={4} />
        <Input type="number" placeholder="Amount" value={expense.amount} name="amount" required onChange={handleChange} mb={4} />
        <Select name="expensePaidBy" value={expense.expensePaidBy} onChange={handleChange} mb={4}>
          {expenseWith?.map((eachMember) => (
            <option key={eachMember} value={eachMember}>
              {eachMember}
            </option>
          ))}
        </Select>
        <Select value={expense.isEqualSplit} onChange={handleChange} name="isEqualSplit" mb={4}>
          <option value={true}>Equally</option>
          <option value={false}>Unequally</option>
        </Select>
        {!expense.isEqualSplit && (
          <>
            {expenseWith?.map((eachMember) => (
              <Box key={eachMember} mb={4}>
                {eachMember} Share:
                <Input
                  required
                  type="number"
                  name={`unEqualSplit-${eachMember}`}
                  value={expense.unEqualSplit[eachMember] || ""}
                  onChange={handleChange}
                  mt={2}
                />
              </Box>
            ))}
            <Text color={getRemainingAmount() === 0 ? "green" : "red"} mb={4}>
              Remaining Amount: {getRemainingAmount()}
            </Text>
          </>
        )}
        <Button type="submit" colorScheme="blue">Add</Button>
      </form>
    </Box>
  );
}
