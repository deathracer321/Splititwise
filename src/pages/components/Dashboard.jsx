import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Friends from './Friends/Friends';
import Groups from './Groups/Groups';
import Profile from './Profile';
import { AppContext } from "../_app";

export default function Dashboard() {
  const { state, setState, credentials, setCredentials} = useContext(AppContext);
  const {userName,password} = credentials
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('Friends');
  const [isClient, setIsClient] = useState(false); // Check if we're on the client side

  // Handle logout
  const handleLogout = () => {
    if (isClient) {
      localStorage.removeItem("userInfo");
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('password')
      setCredentials({
        userName : '',
        password : ''
      })
      router.push("./Login");
    }
  };

  // Handle tab click
  const tabClickHandler = (e) => {
    switch (e.target.id) {
      case 'Friends':
        setState((prevState) => ({ ...prevState, specificTopic: "", specificGroup: "" }));
        setCurrentTab('Friends');
        break;
      case 'Groups':
        setState((prevState) => ({ ...prevState, specificTopic: "", specificGroup: "" }));
        setCurrentTab('Groups');
        break;
      case 'Profile':
        setState((prevState) => ({ ...prevState, specificTopic: "", specificGroup: "" }));
        setCurrentTab('Profile');
        break;
      default:
        break;
    }
  };

  // Return current component based on the tab
  const returnCurrentComponent = (component) => {
    if (component === "Friends") {
      return <Friends />;
    } else if (component === "Groups") {
      return <Groups />;
    } else if (component === "Profile") {
      return <Profile />;
    }
  };

  // Ensure we only check cred on the client side
  useEffect(() => {
    setIsClient(true); // We're now on the client side
    if (isClient && !sessionStorage.getItem('userName')) {
      router.push("./Login");
    }
  }, [isClient, router]);

  return (
    <>
      <div className="dashboardMainView">
        {isClient && (
          <button onClick={handleLogout} className="Logout">
            Logout as {isClient && userName}
          </button>
        )}
        {returnCurrentComponent(currentTab)}
      </div>
      <div className="dashboardBottomMenu">
        <button onClick={tabClickHandler} id="Friends">Friends</button>
        <button onClick={tabClickHandler} id="Groups">Groups</button>
        <button onClick={tabClickHandler} id="Profile">Profile</button>
      </div>
    </>
  );
}
