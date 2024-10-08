import { useState } from "react";

export default function AddExpense({ expenseWith, onAddExpense }) {
    const userName = sessionStorage.getItem("userName");
    const password = sessionStorage.getItem("password");

    const [expense, setExpense] = useState({
        desc: "",
        amount: "",
        expensePaidBy: userName, 
        unEqualSplit: {
            [userName]: undefined,
            [expenseWith]: undefined,
        },
        isEqualSplit: true, // Default to equal split
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "isEqualSplit") {
            setExpense((prev) => ({
                ...prev,
                isEqualSplit: JSON.parse(value), // Parse string "true"/"false" to boolean
            }));
        } else if (name === "unEqualSplitUser") {
            setExpense((prev) => ({
                ...prev,
                unEqualSplit: {
                    ...prev.unEqualSplit,
                    [userName]: value,
                },
            }));
        } else if (name === "unEqualSplitFriend") {
            setExpense((prev) => ({
                ...prev,
                unEqualSplit: {
                    ...prev.unEqualSplit,
                    [expenseWith]: value,
                },
            }));
        } else {
            setExpense((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleAddExpense = (e) => {
        e.preventDefault();
        const newExpense = { expense, userName, password, expenseWith };
        // Pass the new expense to the parent function
        onAddExpense(newExpense);
    };

    return (
        <div style={{ border: "2px solid black" }}>
            <h3>Add your expense with {expenseWith} here:</h3>
            <br />
            <form onSubmit={handleAddExpense}>
                Description:{" "}
                <input
                    type="text"
                    value={expense.desc}
                    name="desc"
                    required={true}
                    onChange={handleChange}
                />
                <br />
                Amount:{" "}
                <input
                    type="number"
                    value={expense.amount}
                    name="amount"
                    required={true}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Add</button>
                <br />
                Paid By:{" "}
                <select
                    name="expensePaidBy"
                    value={expense.expensePaidBy}
                    onChange={handleChange}
                >
                    <option value={userName}>{userName}</option>
                    <option value={expenseWith}>{expenseWith}</option>
                </select>
                Split:{" "}
                <select
                    value={expense.isEqualSplit}
                    onChange={handleChange}
                    name="isEqualSplit"
                >
                    <option value={true}>Equally</option>
                    <option value={false}>Unequally</option>
                </select>
                {!expense.isEqualSplit && (
                    <>
                        <br/>
                        <br/>
                        Your share:
                        <input
                            required={true}
                            type="number"
                            name="unEqualSplitUser"
                            value={expense.unEqualSplit[userName]}
                            onChange={handleChange}
                        />
                        <br/>
                        <br/>
                        Friend's share:
                        <input
                            required={true}
                            type="number"
                            name="unEqualSplitFriend"
                            value={expense.unEqualSplit[expenseWith]}
                            onChange={handleChange}
                        />
                    </>
                )}
            </form>
        </div>
    );
}
