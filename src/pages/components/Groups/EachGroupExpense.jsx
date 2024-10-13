
import {floorToTwoDecimal} from '../../components/utils'

export default function EachExpense({ groupMembers = [], groupData = [] }) {

  const expensesData = groupData.expenses;
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
            <td style={expenseStyle}>Paid By</td>
            <td style={expenseStyle}>Is equal split?</td>
            <td style={expenseStyle}>Amount</td>
            <td style={expenseStyle}>Split Details</td>
          </tr>
        </thead>
        <tbody>
          {expensesData?.length > 0 &&
            expensesData.map((eachItem, ind) => (
              <tr key={ind}>
                <td style={expenseStyle}>
                  {new Date(eachItem.dateAdded).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td style={expenseStyle}>{eachItem.expenseTitle}</td>
                <td style={expenseStyle}>{eachItem.expensePaidBy}</td>
                <td style={expenseStyle}>
                  {eachItem.isEqualSplit ? "Yes" : "No"}
                </td>
                <td style={expenseStyle}>
                  <div style={{ color: "blue" }}>Total: {eachItem.totalAmount}</div>
                </td>
                <td style={expenseStyle}>
                  {eachItem?.isEqualSplit ? (
                    <div style={{ color: "red" }}>
                      {/* Equal split - show the share for each member */}
                      {groupMembers.map((member) => (
                        <div key={member}>
                          {member}:{" "}
                          {floorToTwoDecimal(eachItem?.unEqualSplit?.[member] || "N/A")}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {/* Unequal split - show the custom shares for each member */}
                      {groupMembers.map((member) => (
                        <div key={member}>
                          {member}:{" "}
                          <span
                            style={{
                              color:
                                eachItem.expensePaidBy === member
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {floorToTwoDecimal(eachItem?.unEqualSplit?.[member]) || "N/A"}
                          </span>
                        </div>
                      ))}
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
