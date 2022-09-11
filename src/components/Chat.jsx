import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from './User';
import MessageInput from './MessageInput';
import "../styles/Chat.css"

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const usersRef = collection(db, "users");

    // creates query filtering out current user
    const userQuery = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
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
            <div>{`Your conversation with ${chat.name}`}</div> 
            <MessageInput />
          </>
          ) : <div className="chat-intro">Welcome! <br></br>Select a user from the list to begin a conversation.</div>}
      </div>
    </div>
  )
}

export default Chat