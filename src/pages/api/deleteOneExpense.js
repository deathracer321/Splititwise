import { ref, get, set } from "firebase/database";
import { database } from "../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userName, password, expenseID, expenseWith } = req.body;

    try {
      // Database references
      const userTransactionRef = ref(
        database,
        "friendToFriendTransactions/" + userName + "_" + expenseWith
      );
      const anotherUserTransactionRef = ref(
        database,
        "friendToFriendTransactions/" + expenseWith + "_" + userName
      );
      const userRef = ref(database, "users/" + userName);

      // Fetch current data from the database
      const thisUserSnapshot = await get(userTransactionRef);
      const anotherUserSnapshot = await get(anotherUserTransactionRef);

      if (!thisUserSnapshot.exists() && !anotherUserSnapshot.exists()) {
        res.status(200).json({ message: "No Group Exists" });
      } else if (thisUserSnapshot.exists()) {
        // Update the existing expense array for this user
        const existingExpenses = thisUserSnapshot.val();
        let filteredArr = existingExpenses.filter((eachExpense) => {
          return eachExpense.expenseID !== expenseID;
        });
        await set(userTransactionRef, filteredArr); // Update the array in the database
        res.status(200).json({ message: "Expense Deleted Successfully" });
      } else if (anotherUserSnapshot.exists()) {
        // Update the existing expense array for this user
        const existingExpenses = anotherUserSnapshot.val();
        let filteredArr = existingExpenses.filter((eachExpense) => {
          return eachExpense.expenseID !== expenseID;
        });
        await set(anotherUserTransactionRef, filteredArr); // Update the array in the database
        res.status(200).json({ message: "Expense Deleted Successfully" });
      } else {
        res.status(200).json({ message: "Something fishy? :)" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong", details: error.message });
    }
  } else {
    // Method not allowed for non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
