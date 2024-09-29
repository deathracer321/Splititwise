// pages/api/login.js
import { ref, get } from "firebase/database";
import { database } from "../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password } = req.body;

    try {
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      
      // Get the user data from the database
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // User does not exist
        res.status(200).json({ message: 'Please Sign Up first or Check username' });
      } else {
        const userData = snapshot.val();
        
        // Validate the password
        if (userData.password === password) {
          res.status(201).json({ message: 'Logged in successfully', userInfo: userData });
        } else {
          res.status(200).json({ message: 'Incorrect username or password' });
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
