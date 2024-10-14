import { ref, get, set } from "firebase/database";
import { database } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password, expenseID, groupName } = req.body;

    try {
      // Database references
      const groupRef = ref(database, 'groups/' + groupName);
      const userRef = ref(database, 'users/' + userName);
      const expenseRef = ref(database, 'groups/' + groupName + '/expenses');

      // Fetch current data from the database
      const thisUserSnapshot = await get(userRef);
      const groupSnapshot = await get(groupRef);
      const expenseSnapshot = await get(expenseRef);

      // Check if user exists
      if (!thisUserSnapshot.exists()) {
        res.status(200).json({ message: "User does not exist, please create an account first" });
        return;
      }

      // Check if group exists
      if (!groupSnapshot.exists()) {
        res.status(200).json({ message: "Group doesn't exist" });
        return;
      }

      const userData = thisUserSnapshot.val();

      // Verify user's password
      if (userData.password !== password) {
        res.status(200).json({ message: "Not authenticated" });
        return;
      }

      // Add the new expense
      if (!expenseSnapshot.exists()) {
        // If no expenses exist in the group yet, something fishy
        res.status(200).json({ message: 'There is no expense yet added, something fishy :(' });
      } else {
        // If there are existing expenses, remove the expense that has the id passed
        const existingExpenses = expenseSnapshot.val();
        // ...need to update the logic here
        let filteredArr = existingExpenses.filter((eachExpense)=>{
            return eachExpense.expenseID !== expenseID
        })
        await set(expenseRef, filteredArr); // Use `set` to overwrite with the updated array
        res.status(200).json({ message: "Expense Deleted successfully!" });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
  } else {
    // Method not allowed for non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
