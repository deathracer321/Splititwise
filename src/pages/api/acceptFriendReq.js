import { ref, get, update } from "firebase/database";
import { database } from "../../lib/firebase";  // Import the database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, password, whomToAcceptOrReject, action } = req.body;

    try {
      // Reference to the current user in the Realtime Database
      const userRef = ref(database, 'users/' + userName);
      
      // Get the current user data from the database
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // User does not exist
        res.status(200).json({ message: 'Please Sign Up first or Check username' });
        return;
      }

      const userData = snapshot.val();

      // Validate the password
      if (userData.password !== password) {
        res.status(200).json({ message: 'Incorrect username or password' });
        return;
      }

      // Check if the friend request exists in friendReqs
      if (!userData.friendReqs || !userData.friendReqs.includes(whomToAcceptOrReject)) {
        res.status(200).json({ message: 'Let them first send you a friend request' });
        return;
      }

      const updatedFriendReqs = [...userData.friendReqs];
      const index = updatedFriendReqs.indexOf(whomToAcceptOrReject);

      // Remove the friend request from friendReqs
      if (index > -1) {
        updatedFriendReqs.splice(index, 1);
      }

      if (action === "reject") {
        // Handle rejection logic - remove friend request from current user
        await update(userRef, { friendReqs: updatedFriendReqs });

        // Also remove current user's name from the friends array of the requested person
        const whomToRejectRef = ref(database, 'users/' + whomToAcceptOrReject);
        const whomToRejectSnapshot = await get(whomToRejectRef);

        if (whomToRejectSnapshot.exists()) {
          const whomToRejectData = whomToRejectSnapshot.val();
          const updatedWhomToRejectFriends = whomToRejectData.friends
            ? [...whomToRejectData.friends].filter(friend => friend !== userName)
            : [];

          // Update the requested person's friends array
          await update(whomToRejectRef, { friends: updatedWhomToRejectFriends });
        }

        res.status(201).json({ message: 'Friend request rejected', userInfo: { ...userData, friendReqs: updatedFriendReqs } });
      } else if (action === "accept") {
        // For acceptance, add to the friends array and update friendReqs
        const updatedFriends = userData.friends ? [...userData.friends] : [];
        updatedFriends.push(whomToAcceptOrReject);

        // Update the current user's friends and friendReqs in the database
        await update(userRef, {
          friendReqs: updatedFriendReqs,
          friends: updatedFriends,
        });

        res.status(201).json({ message: 'Friend request accepted', userInfo: { ...userData, friendReqs: updatedFriendReqs, friends: updatedFriends } });
      } else {
        res.status(400).json({ message: 'Invalid action' });
      }

    } catch (error) {
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
