import { useState, useEffect } from "react";
import AddFriendToGroup from './AddFriendToGroup'
import axios from "axios";
import AddGroupExpense from './AddGroupExpense'
import EachExpense from "../Groups/EachGroupExpense";
import TotalSettlements from './TotalSettlements'
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
            <h1>
                 {topicName} 
                </h1>
            
            <TotalSettlements groupData={groupData}/>

            <div>
                <AddFriendToGroup groupName={topicName} fetchAllExpenses={fetchAllExpenses}/>
            </div>

            <div>
                <AddGroupExpense expenseWith={groupData.members} onAddExpense={handleNewExpense} groupName={topicName}/>
            </div>

            <div>
                <EachExpense groupMembers={groupData.members} groupData={groupData} fetchAllExpenses={fetchAllExpenses} groupName={topicName}/>
            </div>
            
        </>
    );
}
