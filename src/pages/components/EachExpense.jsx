export default function EachExpense({dateAdded,expenseTitle,islent,amount,topicName}){
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

    </div>
}