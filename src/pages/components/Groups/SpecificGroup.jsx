import { useState, useEffect, useContext } from "react";
import AddFriendToGroup from './AddFriendToGroup'
import axios from "axios";
import AddGroupExpense from './AddGroupExpense'
import EachExpense from "../Groups/EachGroupExpense";
import TotalSettlements from './TotalSettlements'
import { AppContext } from "src/pages";
export default function SpecificGroup({ topicName }) {
    const [groupData, setGroupData] = useState({});
    const {credentials } = useContext(AppContext);
    const {userName,password} = credentials;

    // Fetch all expenses on mount
    const fetchAllExpenses = async () => {
        const response = await axios.post('/api/groups/getGroupData', {
            userName: userName,
            password: password,
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
            userName: userName,
            password: password,
            expense: newExpense,
            groupName: topicName
        });
            
        alert(response.data.message);
        fetchAllExpenses();
    };

    return (
        <>
            <h1>
                 {topicName.split('_')[1]} 
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
