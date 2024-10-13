import { ref, get } from "firebase/database";
import { database } from "../../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password , groupName} = req.body;

    if (!userName || !password) {
      return res.status(400).json({ error: 'Please provide username or password' });
    }

    try {
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      
      const userSnapshot = await get(userRef);
      

      if (userSnapshot.exists()) {
        // Fetch all groups
        const groupRef = ref(database,'groups/' + groupName)
        const groupSnapshot = await get(groupRef);

        if (groupSnapshot.exists()) {
          const groupData = groupSnapshot.val();

          if(groupData.members.includes(userName)){
              
              // Respond with the group IDs where the user is a member or admin
              res.status(200).json({ groupData });
          }else{
            res.status(201).json({ message : "you are not a member of this group yet so you cant access group data" });
          }

        } else {
          res.status(200).json({ message: 'No groups found' });
        }
      } else {
        res.status(404).json({ message: 'User does not exist, please sign up' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user or group data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
