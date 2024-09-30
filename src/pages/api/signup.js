// pages/api/your-api.js
import { ref, get, set } from "firebase/database";
import { database } from "../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password } = req.body;
    
    try {
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      
      // Check if the user already exists
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        // User already exists
        res.status(200).json({ message: 'User already exists. Please log in.' });
      } else {
        // Create a new user
        await set(userRef, { userName, password });
        res.status(201).json({ message: 'User created successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
    
  } else if (req.method === 'GET') {
    try {
      // Get all users from the database
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
