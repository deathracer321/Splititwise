import { useState, useEffect } from "react";
import EachExpense from "../components/EachExpense";
import AddExpense from './AddExpense';
import axios from "axios";
import TotalSettlements from "./Friends/TotalSettlements";

export default function SpecificTopic({ topicName }) {
    const [expensesData, setExpensesData] = useState([]);

    // Fetch all expenses on mount
    const fetchAllExpenses = async () => {
        const response = await axios.post('/api/getFriendExpenses', {
            userName: sessionStorage.getItem('userName'),
            password: sessionStorage.getItem('password'),
            expenseWith: topicName
        });
        setExpensesData(response.data.data);
    };

    useEffect(() => {
        fetchAllExpenses();
    }, []);

    // Function to handle adding a new expense and updating the expenses data
    const handleNewExpense = async (newExpense) => {
        const response = await axios.post('/api/createExpense', newExpense);
        if (response.data.message === "Expense Created Successfully") {
            // Fetch expenses again to reflect the new addition
            fetchAllExpenses();
            alert("Expense added successfully");
        } else {
            alert(response.data.message);
        }
    };

    return (
        <>
            <TotalSettlements expenses={expensesData} expenseWith={topicName}/>
            <AddExpense expenseWith={topicName} onAddExpense={handleNewExpense} />
            <br/>
            <br/>
            <div style={{ border: "5px solid brown" }}>
                <p>Below you see all expenses with: {topicName}</p>
                <EachExpense topicName={topicName} expensesData={expensesData} fetchAllExpenses={fetchAllExpenses}/>
            </div>
        </>
    );
}
