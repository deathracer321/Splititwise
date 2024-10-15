import { useState, useEffect, useContext } from "react";
import { Box, Heading, IconButton, Collapse, VStack } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import AddFriendToGroup from "./AddFriendToGroup";
import axios from "axios";
import AddGroupExpense from "./AddGroupExpense";
import EachExpense from "../Groups/EachGroupExpense";
import TotalSettlements from "./TotalSettlements";
import { AppContext } from "src/pages/_app";

export default function SpecificGroup({ topicName }) {
  const [groupData, setGroupData] = useState({});
  const { credentials } = useContext(AppContext);
  const { userName, password } = credentials;
  
  // State for dropdowns
  const [isSettlementsOpen, setIsSettlementsOpen] = useState(true);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false);

  // Fetch all expenses on mount
  const fetchAllExpenses = async () => {
    const response = await axios.post("/api/groups/getGroupData", {
      userName: userName,
      password: password,
      groupName: topicName,
    });
    setGroupData(response.data.groupData);
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  // Function to handle adding a new expense and updating the expenses data
  const handleNewExpense = async (newExpense) => {
    const response = await axios.post("/api/groups/addGroupExpense", {
      userName: userName,
      password: password,
      expense: newExpense,
      groupName: topicName,
    });

    alert(response.data.message);
    fetchAllExpenses();
  };

  return (
    <VStack spacing={4} align="stretch" p={4} bg="gray.50" borderRadius="md" boxShadow="md" maxW="800px" mx="auto">
      <Heading as="h1" size="lg" textAlign="center">
      Group Name:  <b>{topicName.split("_")[1]}</b>
      </Heading>

      {/* Total Settlements Section with Dropdown */}
      <Box>
        <IconButton
          icon={isSettlementsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsSettlementsOpen(!isSettlementsOpen)}
          aria-label="Toggle Settlements"
          mb={2}
          variant="ghost"
          size="sm"
        />
        <Heading as="h2" size="md" display="inline">
          Total Settlements
        </Heading>
        <Collapse in={isSettlementsOpen}>
          <TotalSettlements groupData={groupData} />
        </Collapse>
      </Box>

      {/* Add Friend to Group Section with Dropdown */}
      <Box>
        <IconButton
          icon={isAddFriendOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsAddFriendOpen(!isAddFriendOpen)}
          aria-label="Toggle Add Friend"
          mb={2}
          variant="ghost"
          size="sm"
        />
        <Heading as="h2" size="md" display="inline">
          Add Friend to Group
        </Heading>
        <Collapse in={isAddFriendOpen}>
          <AddFriendToGroup groupName={topicName} fetchAllExpenses={fetchAllExpenses} />
        </Collapse>
      </Box>

      {/* Add Group Expense Section with Dropdown */}
      <Box>
        <IconButton
          icon={isAddExpenseOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsAddExpenseOpen(!isAddExpenseOpen)}
          aria-label="Toggle Add Expense"
          mb={2}
          variant="ghost"
          size="sm"
        />
        <Heading as="h2" size="md" display="inline">
          Add Group Expense
        </Heading>
        <Collapse in={isAddExpenseOpen}>
          <AddGroupExpense expenseWith={groupData.members} onAddExpense={handleNewExpense} groupName={topicName} />
        </Collapse>
      </Box>

      {/* Group Expenses Section with Dropdown */}
      <Box>
        <IconButton
          icon={isExpensesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsExpensesOpen(!isExpensesOpen)}
          aria-label="Toggle Group Expenses"
          mb={2}
          variant="ghost"
          size="sm"
        />
        <Heading as="h2" size="md" display="inline">
          Group Expenses
        </Heading>
        <Collapse in={isExpensesOpen}>
          <EachExpense groupMembers={groupData.members} groupData={groupData} fetchAllExpenses={fetchAllExpenses} groupName={topicName} />
        </Collapse>
      </Box>
    </VStack>
  );
}
