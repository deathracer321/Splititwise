import { useState, useEffect, useContext } from "react";
import { AppContext } from "src/pages";

export default function AddExpense({ expenseWith, onAddExpense, groupName }) {
  const {credentials} = useContext(AppContext)
  const {userName,password} = credentials;
  const initialState = {
    desc: "",
    amount: "",
    expensePaidBy: userName,
    unEqualSplit: {},
    isEqualSplit: true, // Default to equal split
  };

  const [expense, setExpense] = useState(initialState);

  // Function to update unEqualSplit when isEqualSplit is true
  const handleEqualSplit = (totalAmount) => {
    const equalAmount = totalAmount / expenseWith.length;
    const updatedUnEqualSplit = {};
    expenseWith.forEach((member) => {
      updatedUnEqualSplit[member] = equalAmount;
    });
    return updatedUnEqualSplit;
  };

  // Update unEqualSplit when isEqualSplit changes to true
  useEffect(() => {
    if (expense.isEqualSplit && expense.amount) {
      const updatedSplit = handleEqualSplit(expense.amount);
      setExpense((prev) => ({
        ...prev,
        unEqualSplit: updatedSplit,
      }));
    }
  }, [expense.isEqualSplit, expense.amount]); // Run this effect when isEqualSplit or amount changes

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "isEqualSplit") {
      setExpense((prev) => ({
        ...prev,
        isEqualSplit: JSON.parse(value), // Parse string "true"/"false" to boolean
      }));
    } else if (name.startsWith("unEqualSplit")) {
      // Dynamically update unequal splits
      const memberName = name.split("-")[1];
      setExpense((prev) => ({
        ...prev,
        unEqualSplit: {
          ...prev.unEqualSplit,
          [memberName]: value,
        },
      }));
    } else {
      setExpense((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getRemainingAmount = () => {
    let totalSplit = Object.values(expense.unEqualSplit).reduce(
      (acc, split) => acc + parseInt(split || 0),
      0
    );
    let remaining = parseInt(expense.amount) - totalSplit;
    return remaining || remaining === 0 ? remaining : "Please fill";
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (expense.isEqualSplit || getRemainingAmount() === 0) {
      // Pass the new expense to the parent function
      onAddExpense(expense);
      setExpense(initialState);
    } else {
      alert("Make sure unequal splits sum up to the total amount.");
    }
  };

  return (
    <div style={{ border: "2px solid black" }}>
      <h3>Add your expense with {groupName.split("_")[1]} here:</h3>
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
          {expenseWith?.map((eachMember) => (
            <option key={eachMember} value={eachMember}>
              {eachMember}
            </option>
          ))}
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
            {expenseWith?.map((eachMember) => (
              <div key={eachMember}>
                <br />
                {eachMember} Share:{" "}
                <input
                  required={true}
                  type="number"
                  name={`unEqualSplit-${eachMember}`} // dynamically set input name
                  value={expense.unEqualSplit[eachMember] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div
              style={{ color: getRemainingAmount() === 0 ? "green" : "red" }}
            >
              Remaining Amount:
              {" " + getRemainingAmount()}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
