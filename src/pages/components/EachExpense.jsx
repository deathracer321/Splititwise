export default function EachExpense({ topicName, expensesData = {} }) {
    const expenseStyle = { border: "1px solid black", borderCollapse: "collapse" }
  return (
    <div style={{ border: "2px solid black" }}>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <td style={expenseStyle}>Date</td>
            <td style={expenseStyle}>Expense name</td>
            <td style={expenseStyle}>is lent?</td>
            <td style={expenseStyle}>Amount</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(expensesData).map((eachItem, ind) => (
            <tr key={ind}>
              <td style={expenseStyle}>
                {new Date(expensesData[eachItem].dateAdded).toLocaleDateString(
                  "en-GB",
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false, // This makes it 24-hour format, set to true for 12-hour format
                }
                )}
              </td>
              <td style={expenseStyle}>{expensesData[eachItem].expenseTitle}</td>
              <td style={expenseStyle}>
                {expensesData[eachItem].expensePaidBy ===
                sessionStorage.getItem("userName")
                  ? "Yes"
                  : "No"}
              </td>
              <td style={expenseStyle}>
                {
                  expensesData[eachItem].split[
                    sessionStorage.getItem("userName")
                  ]
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
