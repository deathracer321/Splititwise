import { useState, useEffect } from "react";

import axios from "axios";

export default function SpecificGroup({ topicName }) {
    const [expensesData, setExpensesData] = useState({});

    // Fetch all expenses on mount
    // const fetchAllExpenses = async () => {
    //     const response = await axios.post('/api/getGroupExpenses', {
    //         userName: sessionStorage.getItem('userName'),
    //         password: sessionStorage.getItem('password'),
    //         expenseWith: topicName
    //     });
    //     setExpensesData(response.data.data);
    // };

    // useEffect(() => {
    //     fetchAllExpenses();
    // }, []);

    // Function to handle adding a new expense and updating the expenses data
    // const handleNewExpense = async (newExpense) => {
    //     const response = await axios.post('/api/createExpense', newExpense);
    //     if (response.data.message === "Expense Created Successfully") {
    //         // Fetch expenses again to reflect the new addition
    //         fetchAllExpenses();
    //         alert("Expense added successfully");
    //     } else {
    //         alert(response.data.message);
    //     }
    // };

    return (
        <>
            {/* <AddExpense expenseWith={topicName} onAddExpense={handleNewExpense} />
            <br/>
            <br/>
            <div style={{ border: "5px solid brown" }}>
                <p>Below you see all expenses with: {topicName}</p>
                <EachExpense topicName={topicName} expensesData={expensesData} />
            </div> */}

            this is Group {topicName}
            
            <div>
                do not show this component if he is not admin
                Add group members if admin , he can add anyone(literally anyone)
            </div>

            <div>
                show all add expense here, anyone in the group are allowed to add expenses
            </div>

            <div>
                show all the expenses in the group here
            </div>
            
        </>
    );
}
