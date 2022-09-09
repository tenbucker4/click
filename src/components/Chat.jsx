import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "../styles/Chat.css"

const Chat = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");

    // creates query filtering out current user
    const userQuery = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    // execute query
    const unsub = onSnapshot(userQuery, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  console.log(users)

  return (
    <div className="chat-page">
      <div className="conversations"></div>
      <div className="chat-box"></div>
    </div>
  )
}

export default Chat