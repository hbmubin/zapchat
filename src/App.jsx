import { useState } from "react"
import Chats from "./components/Chats"
import Profile from "./components/Profile"
import Content from "./components/Content"
import BottomNav from "./components/BottomNav"
import TopUser from "./components/TopUser"

function App() {

  const [sideView, setSideView] = useState('chats')

  return (
    <div className="flex h-screen">
      <div className="side-view w-3/12 flex flex-col h-full">
        <TopUser />
        <div className="flex-grow bg-deepPink">
          {sideView === "chats" && <Chats />}
          {sideView === "profile" && <Profile />}
        </div>
        <BottomNav sideView={sideView} setSideView={setSideView} />
      </div>
      <Content />
    </div>
  );
}

export default App
