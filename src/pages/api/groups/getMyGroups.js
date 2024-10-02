import { ref, get } from "firebase/database";
import { database } from "../../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ error: 'Not authenticated' });
    }

    try {
      // Reference to the user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        // Fetch all groups
        const groupsRef = ref(database, 'groups');
        const groupsSnapshot = await get(groupsRef);

        if (groupsSnapshot.exists()) {
          const groupsData = groupsSnapshot.val();
          const userGroups = [];

          // Iterate over the groups to check if the user is the admin or a member
          for (const groupId in groupsData) {
            const group = groupsData[groupId];
            const [admin, groupName] = groupId.split('_');  // Extract admin and group name from the ID

            // Check if the user is the admin or in the members array
            if (admin === userName || (group.members && group.members.includes(userName))) {
              userGroups.push(groupId);  // Collect the group ID
            }
          }

          // Respond with the group IDs where the user is a member or admin
          res.status(200).json({ userGroups });
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
