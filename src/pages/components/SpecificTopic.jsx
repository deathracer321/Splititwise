import { useState, useEffect, useContext } from "react";
import EachExpense from "../components/EachExpense";
import AddExpense from './AddExpense';
import axios from "axios";
import TotalSettlements from "./Friends/TotalSettlements";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { AppContext } from "../_app";

export default function SpecificTopic({ topicName }) {
  const [expensesData, setExpensesData] = useState([]);
  const { credentials } = useContext(AppContext);
  const { userName, password } = credentials;

  const fetchAllExpenses = async () => {
    const response = await axios.post('/api/getFriendExpenses', {
      userName: userName,
      password: password,
      expenseWith: topicName
    });
    setExpensesData(response.data.data);
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const handleNewExpense = async (newExpense) => {
    const response = await axios.post('/api/createExpense', newExpense);
    if (response.data.message === "Expense Created Successfully") {
      alert("Expense added successfully");
    } else {
      alert(response.data.message);
    }
    fetchAllExpenses();
  };

  return (
    <Box>
      <TotalSettlements expenses={expensesData} expenseWith={topicName} />
      <AddExpense expenseWith={topicName} onAddExpense={handleNewExpense} />
      <Box mt={8} border="2px solid brown" p={4} borderRadius="md">
        <Text>Below you see all expenses with: {topicName}</Text>
        <EachExpense topicName={topicName} expensesData={expensesData} fetchAllExpenses={fetchAllExpenses} />
      </Box>
    </Box>
  );
}
