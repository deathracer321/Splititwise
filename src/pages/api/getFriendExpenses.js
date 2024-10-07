import { ref, get, set, update } from "firebase/database";
import { database } from "../../lib/firebase";  // Import the database
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password, expenseWith } = req.body;

    try {
      console.log(userName,"_",expenseWith)
      const userTransactionRef = ref(database, 'friendToFriendTransactions/' + userName + "_" + expenseWith);
      const anotherUserTransactionRef = ref(database, 'friendToFriendTransactions/' + expenseWith + "_" + userName);
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      
      // Get the user data from the database
      const snapshot = await get(userRef);

      const userData = snapshot.val();

      // Validate the password
      if (userData.password === password) {
        console.log("Authenticated")
      } else {
        res.status(200).json({ message: 'Incorrect username or password' });
        return ""
      }
      
      const thisUserSnapshot = await get(userTransactionRef);
      const anotherUserSnapshot = await get(anotherUserTransactionRef);


      if (!thisUserSnapshot.exists() && !anotherUserSnapshot.exists()) {
        res.status(202).json({ message: 'Start your First Transaction with your friend' });
      } else if (thisUserSnapshot.exists()) {
        const thisUserTransactionData = thisUserSnapshot.val();
        res.status(200).json({ message: "Expense fetched Successfully" ,data : thisUserTransactionData});
      } else if (anotherUserSnapshot.exists()) {
        const anotherUserTransactionData = anotherUserSnapshot.val();
        res.status(200).json({ message: "Expense fetched Successfully" ,data : anotherUserTransactionData});
      } else {
        res.status(200).json({ message: "Something fishy? :)" });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
