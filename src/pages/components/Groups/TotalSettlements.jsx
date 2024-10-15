import { useContext } from "react";
import { Box, Text, VStack, Heading, Divider } from "@chakra-ui/react";
import floorToTwoDecimal from "../utils";
import { AppContext } from "src/pages/_app";

export default function TotalSettlements({ groupData }) {
  const expenses = groupData?.expenses || [];
  const { credentials } = useContext(AppContext);
  const { userName } = credentials;

  const settlementWithEachPerson = (withWhom) => {
    let withWhomSettlement = 0;
    expenses?.forEach((eachExpense) => {
      let paidBy = eachExpense?.expensePaidBy;
      let withWhomShare = Number(eachExpense.unEqualSplit?.[withWhom]) || 0;
      let myShare = Number(eachExpense.unEqualSplit?.[userName]);
      if (paidBy === userName) {
        withWhomSettlement += withWhomShare;
      }
      if (paidBy === withWhom) {
        withWhomSettlement -= myShare;
      }
    });
    return withWhomSettlement;
  };

  return (
    <Box
      border="2px solid red"
      borderRadius="lg"
      p={4}
      w={{ base: "100%", md: "80%" }}
      maxW="800px"
      mx="auto"
      bg="gray.50"
      boxShadow="md"
    >
      <Heading as="h2" size="lg" mb={4}>
        Cumulative Settlement Charts
      </Heading>
      <Divider mb={4} />
      <VStack spacing={4} align="stretch">
        {groupData?.members?.map((member, ind) => {
          if (member !== userName) {
            const settlement = settlementWithEachPerson(member);
            return (
              <Box key={ind} p={4} borderWidth="1px" borderRadius="md" bg="white" boxShadow="sm">
                <Text fontSize="lg" fontWeight="bold">
                  {member}
                </Text>
                <Text color={settlement > 0 ? "green.500" : "red.500"}>
                  {settlement > 0
                    ? `should give you: ${floorToTwoDecimal(settlement)}`
                    : `receives from you: ${floorToTwoDecimal(settlement)}`}
                </Text>
              </Box>
            );
          }
        })}
      </VStack>
    </Box>
  );
}
