import axios from "axios"
import { useEffect, useState } from "react"

export default function EachExpense({dateAdded,expenseTitle,islent,amount,topicName}){
    // here topic name refers to 

    const [expensesData,setExpensesData] = useState({});


    const fetchAllExpenses = async () =>{
        let allExpenseData = await axios.post('/api/getFriendExpenses',{
            userName : sessionStorage.getItem('userName'),
            password : sessionStorage.getItem('password'),
            expenseWith : topicName
        })
        setExpensesData(allExpenseData.data.data)
        console.log(allExpenseData.data.data)
    }
    

    useEffect(()=>{
        fetchAllExpenses();
    },[])


    return <div style={{border: "2px solid black"}}>
    <p>This is each expense row: {topicName} </p>
    Date:{dateAdded},
    <span>

    ExpenseName: {expenseTitle},
    </span>
    {
        islent ? <span>you lent:</span> :  <span>you borrowed:</span>
    }
    {amount}


<table>
    <thead>
        <tr>
            <td>Date</td>
            <td>Expense name</td>
            <td>is lent?</td>
            <td>Amount</td>
        </tr>
    </thead>
        {Object.keys(expensesData).map((eachItem,ind) => (
            <tr key={ind}>
                <td>{expensesData[eachItem].dateAdded}</td>
                <td>{expensesData[eachItem].expenseTitle}</td>
                <td>{expensesData[eachItem].expensePaidBy===sessionStorage.getItem('userName') ? "Yes" : "No"}</td>
                <td>{expensesData[eachItem].split[sessionStorage.getItem('userName')]}</td>
            </tr>
        ))}
        </table>
    </div>
}