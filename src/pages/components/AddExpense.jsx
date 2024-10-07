import axios from "axios";
import { useState } from "react";
import v4 from 'uuid'

export default function AddExpense({expenseWith}){

    const userName = sessionStorage.getItem("userName");
    const password = sessionStorage.getItem("password");

    const [expense, setExpense] = useState({
        desc: "",
        amount: "",
        expensePaidBy: userName, // Set default value to avoid undefined
    });

    const handleChange = (event) =>{
       const {name ,value} = event.target;
       setExpense((prev)=>{
        return {
            ...prev,
            [name] : value
        }
       })
    }

    const handleAddExpense = async (e) =>{
        e.preventDefault();
        let response = await axios.post('/api/createExpense',{expense,userName,password,expenseWith});
        if(response.data.message==="Expense Created Successfully"){
            alert("expense added successfully")
        }else{
            alert(response.data.message)
        }
    }


    return <div style={{border: "2px solid black"}}>
        <h3>Add your expense with {expenseWith} here:</h3>
        <br/>
        <form onSubmit={handleAddExpense}>
        Description:<input type="text" value={expense.desc} name="desc"  required={true} onChange={handleChange}/><br/>
        Amount:<input type="number"  value={expense.amount} name="amount" required={true} onChange={handleChange}/><br/>
        <button type="submit">Add</button><br/>
        Paid By:<select name="expensePaidBy" value={expense.expensePaidBy} onChange={handleChange}>
            <option value={userName}>{userName}</option>
            <option value={expenseWith}>{expenseWith}</option>
        </select>
        Split: <select>
        <option>Equally</option>
        <option>Unequally</option>
        </select>
        </form>
    </div>
}