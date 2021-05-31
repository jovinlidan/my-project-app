import React, { useRef, useState } from "react";
import { database } from "../../../services/FirebaseService";
import { useToast } from "../../../contexts/ToastContext";
import { useChat } from "./../../../contexts/ChatContext";
import Contact from "./../../../components/Contact";
import ChatScreen from "./../../../components/ChatScreen";
import "./ChatRoom.css";
const ChatRoom = () => {
  const addContactRef = useRef();
  const { currentTarget, setCurrentTarget } = useChat();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [contacts, setContacts] = useState([]);
  const username = localStorage.getItem("username");
  const { showToast } = useToast();
  const getContactValDb = async () => {
    const contact = addContactRef.current.value;
    let contactDb = await database.ref("/username/" + contact).once("value");
    return contactDb.val();
  };
  const handleAddContact = () => {
    getContactValDb().then((res) => {
      if (res === null || addContactRef.current.value === "")
        return setError("Username not valid!🙁");
      else if (contacts.filter((contact) => contact.id === res).length !== 0)
        return setError("Contact already exists!🔥");
      else if (addContactRef.current.value === username)
        return setError("Can't add yourself!🦈");
      else {
        setContacts([
          ...contacts,
          { id: res, name: addContactRef.current.value },
        ]);
        setSuccess("Contact Successfully added!🥳");
      }
    });
  };
  const handleDeleteContact = (id) => {
    let contactsCopy = [...contacts];
    setCurrentTarget(undefined);
    setContacts(contactsCopy.filter((contact) => contact.id !== id));
  };

  const handleClickContact = (id, name) => {
    setCurrentTarget({ id, name });
  };

  return (
    <div className="chat-room">
      {error !== "" && showToast(error, 5000, "error", setError)}
      {success !== "" && showToast(success, 5000, "success", setSuccess)}
      <div className="chat-box">
        <div className="add-contact">
          <input type="text" ref={addContactRef} className="add-input" />
          <button className="add-button" onClick={handleAddContact}>
            Add Contact
          </button>
        </div>
        <div className="contacts">
          {contacts.map((contact) => (
            <Contact
              key={contact.id}
              name={contact.name}
              id={contact.id}
              onClick={handleClickContact}
              onDelete={handleDeleteContact}
            />
          ))}
        </div>
      </div>

      <ChatScreen />
    </div>
  );
};

export default ChatRoom;
