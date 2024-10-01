import { ref, get, set } from "firebase/database";
import { database } from "../../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password, groupName } = req.body;

    if (!userName || !password || !groupName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        // User already exists, check if the group already exists (groupName with underscore in path)
        const groupRef = ref(database, 'groups/' + userName + "_" + groupName);
        const groupSnapshot = await get(groupRef);

        if (groupSnapshot.exists()) {
          // Group already exists
          res.status(200).json({ message: 'Group already exists. Please choose a different group name.' });
        } else {
          // Create a new group
          await set(groupRef, { admin: userName, members: [userName] });
          res.status(201).json({ message: 'Group created successfully' });
        }
      } else {
        res.status(201).json({ message: 'User does not exist, signup and come back' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user or group' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
