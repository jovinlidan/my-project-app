import React, { useContext, useState } from "react";
const ChatContext = React.createContext();

export function useChat() {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
  const [currentTarget, setCurrentTarget] = useState();
  const value = { currentTarget, setCurrentTarget };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
