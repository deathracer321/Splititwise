import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Friends from './Friends/Friends'
import Groups from './Groups/Groups'
import Profile from './Profile';
import { useContext } from "react";
import { AppContext } from "..";
export default function Dashboard() {

  const {state,setState} = useContext(AppContext);

  const router = useRouter();
  const [currentTab,setCurrentTab] = useState('Friends');


  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("password");
    localStorage.removeItem("userInfo")
    router.push("./Login");
  };

  const tabClickHandler = (e) =>{
    switch(e.target.id){
      case 'Friends':
        setState((prevState)=>({...prevState,specificTopic:""}))
        setCurrentTab('Friends')
        break;
      case 'Groups':
        setCurrentTab('Groups')
        break;
      case 'Profile':
        setCurrentTab('Profile')
        break;
    }
  }

  const returnCurrentComponent = (component) =>{
    if(component==="Friends"){
      return <Friends/>
    }else if(component==="Groups"){
      return <Groups/>
    }else if(component==="Profile"){
      return <Profile/>
    }
  }


  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      router.push("./Login");
    }
  }, [router]);

  return (
    <>
    <div className="dashboardMainView">
      <button onClick={handleLogout} className="Logout">
        Logout
      </button>

      {returnCurrentComponent(currentTab)}

    </div>
      <div className="dashboardBottomMenu">
        <button onClick={tabClickHandler} id='Friends'>Friends</button>
        <button onClick={tabClickHandler} id='Groups'>Groups</button>
        <button onClick={tabClickHandler} id='Profile'>Profile</button>
      </div>
    </>
  );
}
