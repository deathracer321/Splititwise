// pages/api/your-api.js
import { ref, get, update } from "firebase/database";
import { database } from "../../lib/firebase"; // Import the database

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { requestedUsername, myUsername, password } = req.body;
    try {
      // Reference to the user in the Realtime Database
      const myUsernameRef = ref(database, "users/" + myUsername);
      // Reference to the requested username in the Realtime Database
      const requestedUsernameRef = ref(database, "users/" + requestedUsername);

      // Get the user data from the database
      const myUsernameRefSnapshot = await get(myUsernameRef);

      // Get the requested data from the database
      const requestedUsernameRefSnapshot = await get(requestedUsernameRef);

      if (
        !myUsernameRefSnapshot.exists() ||
        !requestedUsernameRefSnapshot.exists()
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
        const requestedUserData = requestedUsernameRefSnapshot.val();
        // Validate the password
        if (myUserData.password === password) {
          if (!requestedUserData.friendReqs) {
            requestedUserData.friendReqs = [];
          }
          if(requestedUserData?.friendReqs?.includes(myUsername)){
            res
            .status(200)
            .json({ message: "Request Can be sent only once" });
          }else if(requestedUserData?.friends?.includes(myUsername)){
            res
            .status(200)
            .json({ message: `You are already friend with ${requestedUsername}` });
          } else{
              // Add the myUsername to the friendReqs array
              requestedUserData.friendReqs.push(myUsername);
              if(!myUserData.friends){
                myUserData.friends = []
              }
              await update(requestedUsernameRef, {
                  friendReqs: requestedUserData.friendReqs,
                });
                res
                .status(200)
                .json({ message: "Successfully friend request sent!" });
            }
        } else {
          res
            .status(200)
            .json({
              message: "Something went wrong in sending friend Request",
            });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to log in" ,message: error.message});
    }
  }
}
