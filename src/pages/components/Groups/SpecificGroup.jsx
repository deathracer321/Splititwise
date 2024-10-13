import { useState, useEffect } from "react";
import AddFriendToGroup from './AddFriendToGroup'
import axios from "axios";
import AddGroupExpense from './AddGroupExpense'
import EachExpense from "../Groups/EachGroupExpense";

export default function SpecificGroup({ topicName }) {
    const [groupData, setGroupData] = useState({});

    // Fetch all expenses on mount
    const fetchAllExpenses = async () => {
        const response = await axios.post('/api/groups/getGroupData', {
            userName: sessionStorage.getItem('userName'),
            password: sessionStorage.getItem('password'),
            groupName: topicName
        });
        setGroupData(response.data.groupData);
    };

    useEffect(() => {
        fetchAllExpenses();
    }, []);

    // Function to handle adding a new expense and updating the expenses data
    const handleNewExpense = async (newExpense) => {
        const response = await axios.post('/api/groups/addGroupExpense', {
            userName: sessionStorage.getItem('userName'),
            password: sessionStorage.getItem('password'),
            expense: newExpense,
            groupName: topicName
        });
            
        alert(response.data.message);
        fetchAllExpenses();
    };

    return (
        <>
            {/* <AddExpense expenseWith={topicName} onAddExpense={handleNewExpense} />
            <br/>
            <br/>
            <div style={{ border: "5px solid brown" }}>
                <p>Below you see all expenses with: {topicName}</p>
                <EachExpense topicName={topicName} expensesData={expensesData} />
            </div> */}

            Add your {topicName} Group Expenses here
            
            <div>
                <AddFriendToGroup groupName={topicName}/>
            </div>

            <div>
                <AddGroupExpense expenseWith={groupData.members} onAddExpense={handleNewExpense} groupName={topicName}/>
            </div>

            <div>

                <EachExpense groupMembers={groupData.members} groupData={groupData}/>
            </div>
            
        </>
    );
}
