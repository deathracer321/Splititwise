import EachExpense from "../components/EachExpense"
import AddExpense from './AddExpense'
export default function SpecificTopic({topicName}){
    return <>

    <AddExpense expenseWith={topicName}/>
    <div style={{border: "5px solid brown"}}>

    <p>Below you see all expenses with : {topicName} </p>
    <EachExpense topicName={topicName}/>
    </div>
    </>
}