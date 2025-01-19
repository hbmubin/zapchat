import { createContext, useState } from "react";


export const UtilitiesContext = createContext(null);

const UtilitiesProvider = ({ children }) => {

  const [sideView, setSideView] = useState('chats')
  const [content, setContent] = useState('welcome')
  const [myProfile, setMyProfile] = useState(true);
  
  const utilities = {sideView, setSideView, content, setContent, myProfile, setMyProfile};
  return (
    <UtilitiesContext.Provider value={utilities}>{children}</UtilitiesContext.Provider>
  );
};

export default UtilitiesProvider;
