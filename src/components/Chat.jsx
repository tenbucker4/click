import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import User from './User';
import MessageInput from './MessageInput';
import "../styles/Chat.css"

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");

  const currentUser = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");

    // creates query filtering out current user
    const userQuery = query(usersRef, where("uid", "not-in", [currentUser]));
    // execute query
    const find = onSnapshot(userQuery, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => find();
  }, []);

  const selectChat = (user) => {
    console.log(user)
    setChat(user);
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageRecipient = chat.uid;

    // Creates a combined ID to represent chat between two unique users
    const id = currentUser > messageRecipient ? `${currentUser + messageRecipient}` : `${messageRecipient + currentUser}`

    // Need to define first collection (messages) as before, but also need to define a
    //  subcollection ("chat") because we can't use addDoc to a document itself (id)
    await addDoc(collection(db, "messages", id, "chat"), {
      message,
      from: currentUser,
      to: messageRecipient,
      createdAt: Timestamp.fromDate(new Date())
    });
    setMessage("");
  }

  return (
    <div className="chat-page">
      <div className="conversations">
        {users.map((user) => (
          <User key={user.uid} user={user} selectChat={selectChat}/>
        ))}
      </div>
      <div className="chat-box">
        {chat ? (
          <>
            <div>Your conversation with <span style={{ color: "#0084ff" }}>{chat.name}</span></div> 
            <MessageInput sendMessage={sendMessage} message={message} setMessage={setMessage}/>
          </>
          ) : <div className="chat-intro">Welcome! <br></br>Select a user from the list to begin a conversation.</div>}
      </div>
    </div>
  )
}

export default Chat