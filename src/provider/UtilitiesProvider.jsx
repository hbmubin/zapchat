import { createContext, useState } from "react";


export const UtilitiesContext = createContext(null);

const UtilitiesProvider = ({ children }) => {

  const [sideView, setSideView] = useState('chats')
  const [content, setContent] = useState('welcome')
  
  const utilities = {sideView, setSideView, content, setContent};
  return (
    <UtilitiesContext.Provider value={utilities}>{children}</UtilitiesContext.Provider>
  );
};

export default UtilitiesProvider;
