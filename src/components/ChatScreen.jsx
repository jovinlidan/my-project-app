import React, { useRef, useState, useEffect } from "react";
import { useChat } from "./../contexts/ChatContext";
import { useAuth } from "./../contexts/AuthContext";
import { database } from "./../services/FirebaseService";
const ChatScreen = () => {
  const { currentUser } = useAuth();
  const currentID = currentUser.uid;
  const { currentTarget, setCurrentTarget } = useChat();
  const [chats, setChats] = useState([]);
  const messageRef = useRef();
  const conversationRef = useRef();
  const MyRef = database.ref(
    "/users/" + currentID + "/chats/" + currentTarget?.id + "/"
  );
  const targetRef = database.ref(
    "/users/" + currentTarget?.id + "/chats/" + currentID + "/"
  );

  function getChat() {
    if (!currentTarget) return;
    MyRef.on("value", (snapshot) => {
      const items = [];
      if (snapshot.val() === null) return;
      snapshot.val().filter((res) => {
        items.push(res);
      });

      setChats(items);
    });
  }

  useEffect(() => {
    getChat();
    if (!currentTarget) setChats([]);
  }, [currentTarget]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (message === "") return;
    setChats([...chats, { [currentID]: message }]);
    MyRef.set([...chats, { [currentID]: message }]);
    targetRef.set([...chats, { [currentID]: message }]);
    messageRef.current.value = "";
    messageRef.current.scrollIntoView();
    messageRef.current.focus();
    window.setTimeout(() => {
      conversationRef.current.scrollTop = 10000;
    }, 0.000001);
  };

  return (
    <div className="chat-screen">
      <div className="name">{currentTarget?.name || "Target"}</div>
      <div className="conversation" ref={conversationRef}>
        {chats.map((chat, index) => {
          let key = Object.keys(chats[index])[0];
          if (key === currentID)
            return (
              <div className="me" key={index}>
                {chat[key]}
              </div>
            );
          else
            return (
              <div className="target" key={index}>
                {chat[key]}
              </div>
            );
        })}
      </div>

      <form className="input-field">
        <input
          placeholder="Type a message"
          ref={messageRef}
          disabled={!currentTarget}
          type="text"
        />
        <button disabled={!currentTarget} onClick={handleSendMessage}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
