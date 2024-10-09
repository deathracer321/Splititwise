export default function EachExpense({ topicName, expensesData = [] }) {
  const expenseStyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
  };
  return (
    <div style={{ border: "2px solid black" }}>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <td style={expenseStyle}>Date</td>
            <td style={expenseStyle}>Expense name</td>
            <td style={expenseStyle}>is lent?</td>
            <td style={expenseStyle}>is equal split?</td>
            <td style={expenseStyle}>Amount</td>
          </tr>
        </thead>
        <tbody>
          {expensesData?.length>0 && expensesData.map((eachItem, ind) => (
            <tr key={ind}>
              <td style={expenseStyle}>
                {new Date(eachItem.dateAdded).toLocaleDateString(
                  "en-GB",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // This makes it 24-hour format, set to true for 12-hour format
                  }
                )}
              </td>
              <td style={expenseStyle}>
                {eachItem.expenseTitle}
              </td>
              <td style={expenseStyle}>
                {eachItem.expensePaidBy ===
                sessionStorage.getItem("userName")
                  ? "Yes"
                  : "No"}
              </td>
              <td style={expenseStyle}>
                {eachItem.isEqualSplit ? "Yes" : "No"}
              </td>
              <td style={expenseStyle}>
                <div style={{ color: "blue" }}>
                  Total: {eachItem.totalAmount}
                </div>
                <br />
                {eachItem?.isEqualSplit ? (
                  <div style={{color: "red"}}>
                    your share : 
                  {eachItem?.unEqualSplit[
                    sessionStorage.getItem("userName")
                  ]}
                  </div>
                ) : (
                  <>
                    You:{" "}
                    <div
                      style={{
                        color:
                          eachItem.expensePaidBy ===
                          sessionStorage.getItem("userName")
                            ? "green"
                            : "red",
                      }}
                    >
                      {
                        eachItem?.unEqualSplit[
                          sessionStorage.getItem("userName")
                        ]
                      }
                    </div>
                    <br />
                    {topicName}:
                    <div
                      style={{
                        color:
                          eachItem.expensePaidBy ===
                          sessionStorage.getItem("userName")
                            ? "red"
                            : "green",
                      }}
                    >
                      {eachItem?.unEqualSplit[topicName]}
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
