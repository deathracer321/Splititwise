// pages/api/search.js
import { ref, get } from "firebase/database";
import { database } from "../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userName } = req.query;

    try {
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      
      // Get the user data from the database
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // User exists
        res.status(200).json({ message: 'Friend exists' });
      } else {
        // User does not exist
        res.status(200).json({ message: 'Friend not found, double check username' });
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      res.status(500).json({ error: 'Failed to search for user' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
