import {floorToTwoDecimal} from '../utils'
export default function TotalSettlements({expenses, expenseWith}){

    const userName = sessionStorage.getItem('userName')
    const password = sessionStorage.getItem('password')

    const settlementWithEachPerson = (withWhom) =>{
// this function iterates through all the expenses in this group and return the final value with the member passed
        let withWhomSettlemet = 0;
        expenses?.map((eachExpense)=>{
            let paidBy = eachExpense?.expensePaidBy;
            let withWhomShare = Number(eachExpense.unEqualSplit?.[withWhom]) || 0
            let myshare = Number(eachExpense.unEqualSplit?.[userName])
            if(paidBy===userName){
                //this user paid the expense
                withWhomSettlemet = withWhomSettlemet + withWhomShare
            }
            if(paidBy===withWhom){
                // some other person paid it
                withWhomSettlemet = withWhomSettlemet - myshare
            }
        })
        
        return withWhomSettlemet
    }



    return <div style={{border: "2px solid red"}}>
        <h2>Cumulative Settlemets:</h2>
         <p><b>{expenseWith}</b> {settlementWithEachPerson(expenseWith) > 0 ? "should give you" : "receives from you"}: {floorToTwoDecimal(settlementWithEachPerson(expenseWith))}</p>
    </div>
}