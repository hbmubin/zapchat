import Chats from "./components/Chats"
import BottomNav from "./components/BottomNav"
import TopUser from "./components/TopUser"
import Users from "./components/Profile"
import ChatDetails from "./components/ChatDetails"
import Welcome from "./components/Welcome"
import { useContext } from "react"
import { UtilitiesContext } from "./provider/UtilitiesProvider"

function App() {

  const {sideView, content} = useContext(UtilitiesContext);

  return (
    <div className="flex h-screen">
      <div className="side-view w-3/12 flex flex-col h-full">
        <TopUser />
        <div className="flex-grow bg-deepPink overflow-y-auto side-view-container">
          {sideView === "chats" && <Chats />}
          {sideView === "users" && <Users />}
          {sideView === "groups" && <div>Groups</div>}
        </div>
        <BottomNav />
      </div>
      {content === "welcome" && <Welcome />}
      {content === "chatDetails" && <ChatDetails />}
    </div>
  );
}

export default App
