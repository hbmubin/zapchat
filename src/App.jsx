import Chats from "./components/Chats";
import BottomNav from "./components/BottomNav";
import TopUser from "./components/TopUser";
import Users from "./components/Users";
import ChatDetails from "./components/ChatDetails";
import Welcome from "./components/Welcome";
import { useContext } from "react";
import { UtilitiesContext } from "./provider/UtilitiesProvider";
import MyProfile from "./components/MyProfile";
import useWidth from "./hooks/useWidth";

function App() {
  const { sideView, content, myProfile } = useContext(UtilitiesContext);
  const isSmall = useWidth();
  

  return (
    <div className="flex h-screen">
      <div className={` side-view w-96 flex flex-col h-full`}>
        {myProfile ? (
          <MyProfile />
        ) : (
          <>
            <TopUser />
            <div className="flex-grow bg-deepPink overflow-y-auto side-view-container">
              {sideView === "chats" && <Chats />}
              {sideView === "users" && <Users />}
              {sideView === "groups" && <div>Groups</div>}
            </div>
            <BottomNav />
          </>
        )}
      </div>
      {content === "welcome" && !isSmall && <Welcome />}
      {content === "chatDetails" && <ChatDetails />}
    </div>
  );
}

export default App;
