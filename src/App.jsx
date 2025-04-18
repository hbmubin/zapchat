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
import Peoples from "./components/Peoples";

function App() {
  const { sideView, content, myProfile } = useContext(UtilitiesContext);
  const isSmall = useWidth();
  

  return (
    <div className="flex h-screen">
      <div className={`${content === "chatDetails" ? "md:w-96 w-0" : "md:w-96 w-screen"} overflow-hidden duration-200 side-view  flex flex-col h-full`}>
        {myProfile ? (
          <MyProfile />
        ) : (
          <>
            <TopUser />
            <div className="flex-grow bg-deepPink overflow-y-auto side-view-container">
              {sideView === "chats" && <Chats />}
              {sideView === "users" && <Users />}
              {sideView === "peoples" && <Peoples />}
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
