import { createContext, useState } from "react";


export const UtilitiesContext = createContext(null);

const UtilitiesProvider = ({ children }) => {

  const [sideView, setSideView] = useState('chats')
  const [content, setContent] = useState(window.innerWidth > 768 ? 'welcome' : '');
  const [myProfile, setMyProfile] = useState(false);
  const [conversation, setConversation] = useState({});
  
  const utilities = {sideView, setSideView, content, setContent, myProfile, setMyProfile, conversation, setConversation};
  return (
    <UtilitiesContext.Provider value={utilities}>{children}</UtilitiesContext.Provider>
  );
};

export default UtilitiesProvider;
