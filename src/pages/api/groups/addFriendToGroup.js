// pages/api/your-api.js
import { ref, get, update } from "firebase/database";
import { database } from "../../../lib/firebase"; // Import the database

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { requestedUsername, myUsername, password, groupName} = req.body;

    try {
      // Reference to the user in the Realtime Database
      const myUsernameRef = ref(database, "users/" + myUsername);
      // Reference to the requested username in the Realtime Database
      const requestedUsernameRef = ref(database, "users/" + requestedUsername);
        // reference to the group
        const groupRef = ref(database, "groups/" + groupName);

      // Get the user data from the database
      const myUsernameRefSnapshot = await get(myUsernameRef);

      // Get the requested data from the database
      const requestedUsernameRefSnapshot = await get(requestedUsernameRef);

      const groupSnapshot = await get(groupRef)

      if (
        !myUsernameRefSnapshot.exists() ||
        !requestedUsernameRefSnapshot.exists() || !groupSnapshot.exists()
      ) {
        // User does not exist
        res
          .status(200)
          .json({
            message:
              "Please Sign Up first or Check your username or you may not have been authenticated",
          });
      } else {
        const myUserData = myUsernameRefSnapshot.val();
        const groupData = groupSnapshot.val();
        // const requestedUserData = requestedUsernameRefSnapshot.val();
        // Validate the password
        // below step we authenticate the user himself
        if (myUserData.password === password) {
              // Add the myUsername to the friendReqs array

              // in the below step we are not authorizing other users to add friends
              if(myUsername !== groupData.admin){
                res
                .status(200)
                .json({ message: "You are not an admin of this group to add friends" });
                return
              }

              if(groupData.members.includes(requestedUsername)){
                res
                .status(200)
                .json({ message: "Friend already exist" });
                return
              }
              if(!groupData.members){
                //always have first member as the group admin
                groupData.members = [myUsername]
              }

              groupData.members.push(requestedUsername);
              await update(groupRef, {
                  members: groupData.members
                });
                res
                .status(200)
                .json({ message: "Added friend to Group Successfully" });
            
        } else {
          res
            .status(200)
            .json({
              message: "Something went wrong in adding friend to group",
            });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to log in" });
    }
  }
}
