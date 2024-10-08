import { ref, get, set, update } from "firebase/database";
import { database } from "../../lib/firebase";  // Import the database
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password, expense, expenseWith } = req.body;

    // Prepare the expense data
    let expenseData = { 
      "expenseID": uuidv4(),
      "dateAdded": new Date().toISOString(),
      "expenseTitle": expense?.desc,
      "totalAmount": expense?.amount,
      "whoAddedExpense": userName,
      "expensePaidBy": expense.expensePaidBy,
      "isEqualSplit" : expense.isEqualSplit,
      "unEqualSplit" : {
        [userName]: expense.isEqualSplit ? expense.amount/2 : expense.unEqualSplit[userName],
        [expenseWith]: expense.isEqualSplit ? expense.amount/2 : expense.unEqualSplit[expenseWith],
      }
    };

    try {
      const userTransactionRef = ref(database, 'friendToFriendTransactions/' + userName + "_" + expenseWith );
      const anotherUserTransactionRef = ref(database, 'friendToFriendTransactions/' + expenseWith + "_" + userName);
      
      const thisUserSnapshot = await get(userTransactionRef);
      const anotherUserSnapshot = await get(anotherUserTransactionRef);

      if (!thisUserSnapshot.exists() && !anotherUserSnapshot.exists()) {
        // Create a new array for expenses if no transaction history exists
        const newExpenseArray = [expenseData];
        await set(ref(database, 'friendToFriendTransactions/' + userName + "_" + expenseWith), newExpenseArray);
        res.status(200).json({ message: 'This is your first transaction with your friend' });
      } else if (thisUserSnapshot.exists()) {
        // Update the existing expense array for this user
        const existingExpenses = thisUserSnapshot.val();
        existingExpenses.unshift(expenseData);  // Add the new expense to the array
        await set(userTransactionRef, existingExpenses);  // Update the array in the database
        res.status(200).json({ message: "Expense Created Successfully" });
      } else if (anotherUserSnapshot.exists()) {
        // Update the existing expense array for the other user
        const existingExpenses = anotherUserSnapshot.val();
        existingExpenses.unshift(expenseData);  // Add the new expense to the array
        await set(anotherUserTransactionRef, existingExpenses);  // Update the array in the database
        res.status(200).json({ message: "Expense Created Successfully" });
      } else {
        res.status(200).json({ message: "Something fishy? :)" });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
