import { useContext, useEffect } from 'react';
import floorToTwoDecimal from '../utils'
import { AppContext } from 'src/pages';
export default function TotalSettlements({expenses =[], expenseWith}){

    const {credentials} = useContext(AppContext)
    const {userName,password} = credentials;

    const settlementWithEachPerson = (withWhom) =>{
// this function iterates through all the expenses in this group and return the final value with the member passed
        let withWhomSettlemet = 0;
        expenses?.forEach((eachExpense)=>{
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