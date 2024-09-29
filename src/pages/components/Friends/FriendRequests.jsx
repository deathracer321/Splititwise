import { useContext } from "react";
import { AppContext } from "src/pages";

export default function FriendRequests() {
  const { state } = useContext(AppContext);

  // Avoid rendering until state is available
  if (!state?.userInfo?.friendReqs) {
    return <p>No Friend requests you have! njoy...</p>;
  }

  return (
    <>
      <h1>We list your friend requests here</h1>
      <ul>
        {state.userInfo.friendReqs.map((friendReq, ind) => (
          <li key={ind} style={{ border: "2px solid grey" }}>
            <h4>{friendReq}</h4>
            <button>Accept</button>
            <button>Reject</button>
          </li>
        ))}
      </ul>
    </>
  );
}
