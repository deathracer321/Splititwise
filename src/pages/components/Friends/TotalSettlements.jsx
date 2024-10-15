import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import floorToTwoDecimal from '../utils';
import { AppContext } from 'src/pages/_app';

export default function TotalSettlements({ expenses = [], expenseWith }) {
  const { credentials } = useContext(AppContext);
  const { userName } = credentials;

  const settlementWithEachPerson = (withWhom) => {
    let withWhomSettlemet = 0;
    expenses?.forEach((eachExpense) => {
      let paidBy = eachExpense?.expensePaidBy;
      let withWhomShare = Number(eachExpense.unEqualSplit?.[withWhom]) || 0;
      let myshare = Number(eachExpense.unEqualSplit?.[userName]);
      if (paidBy === userName) {
        withWhomSettlemet = withWhomSettlemet + withWhomShare;
      }
      if (paidBy === withWhom) {
        withWhomSettlemet = withWhomSettlemet - myshare;
      }
    });

    return withWhomSettlemet;
  };

  const settlementAmount = settlementWithEachPerson(expenseWith);
  const isPositive = settlementAmount > 0;

  return (
    <Box border="2px solid red" p="10px" my="10px" borderRadius="8px">
      <Text
        fontSize="lg"
        mt="4"
        color={isPositive ? "green.500" : "red.500"}
      >
        <b>{expenseWith}</b> {isPositive ? "should give you " : "receives from you "}: 
        {" " + floorToTwoDecimal(Math.abs(settlementAmount))}
      </Text>
    </Box>
  );
}
