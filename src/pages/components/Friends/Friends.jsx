import { useContext, useEffect } from "react";
import FriendRequests from "./FriendRequests";
import SearchFriend from "./SearchFriend";
import { AppContext } from "src/pages/_app";
import SpecificTopic from "../SpecificTopic";
export default function Friends() {
  const { state, setState } = useContext(AppContext);

  useEffect(() => {}, [state]);

  const friendExpandHandler = (friend) => {
    setState((prevState) => ({ ...prevState, specificTopic: friend }));
  };

  return (
    <>
      {state.specificTopic ? (
        <SpecificTopic topicName={state?.specificTopic} />
      ) : (
        <div>
          <SearchFriend />
          <FriendRequests />
          <h1>We list your friends here:</h1>
          {state?.userInfo?.friends?.map((friend,ind) => {
            return (
              <p key={ind}>
                <button onClick={() => friendExpandHandler(friend)}>
                  {friend}
                </button>
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}
