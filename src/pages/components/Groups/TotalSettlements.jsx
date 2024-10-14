import { useContext, useEffect } from 'react';
import floorToTwoDecimal from '../utils'
import { AppContext } from 'src/pages/_app';
export default function TotalSettlements({groupData}){

    const expenses = groupData?.expenses || [];
    const {credentials } = useContext(AppContext);
    const {userName,password} = credentials;

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
            console.log(withWhomShare,withWhom)
        })
        
        return withWhomSettlemet
    }



    return <div style={{border: "2px solid red"}}>
        <h2>Cumulative Settlemet charts:</h2>
    {groupData?.members?.map((member,ind)=>{
        if(member !== userName)
        return <p key={ind}><b>{member}</b> {settlementWithEachPerson(member) > 0 ? "should give you" : "receives from you"}: {floorToTwoDecimal(settlementWithEachPerson(member))}</p>
    })}
    </div>
}