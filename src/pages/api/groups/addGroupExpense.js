import { ref, get, set } from "firebase/database";
import { database } from "../../../lib/firebase";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password, expense, groupName } = req.body;

    // Prepare the expense data
    let expenseData = { 
      "expenseID": uuidv4(),
      "dateAdded": new Date().toISOString(),
      "expenseTitle": expense?.desc,
      "totalAmount": expense?.amount,
      "whoAddedExpense": userName,
      "expensePaidBy": expense.expensePaidBy,
      "isEqualSplit": expense.isEqualSplit,
      "unEqualSplit": { ...expense.unEqualSplit }  // Always keep unEqualSplit
    };

    // Always create unEqualSplit, even if isEqualSplit is true
    if (expense.isEqualSplit) {
      let numberOfPeople = Object.keys(expense.unEqualSplit).length;
      for (let eachPerson in expense.unEqualSplit) {
        expenseData.unEqualSplit[eachPerson] = expenseData.totalAmount / numberOfPeople;
      }
    }

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
        // If no expenses exist in the group yet, create the first one
        const newExpenseArray = [expenseData];
        await set(expenseRef, newExpenseArray);
        res.status(200).json({ message: 'This is the first transaction in this group' });
      } else {
        // If there are existing expenses, append the new expense to the array
        const existingExpenses = expenseSnapshot.val();
        const updatedExpenses = [...existingExpenses, expenseData];
        await set(expenseRef, updatedExpenses); // Use `set` to overwrite with the updated array
        res.status(200).json({ message: "Expense added successfully!" });
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
