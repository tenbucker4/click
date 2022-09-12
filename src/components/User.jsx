import React, { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Img from "../images/avatar-picture.webp"
import "../styles/User.css"

const User = ({ user, selectChat, currentUser }) => {
  const user2 = user?.uid;
  const [unread, setUnread] = useState("");

  useEffect(() => {
    const id = currentUser > user2 ? `${currentUser + user2}` : `${user2 + currentUser}`
    // subscribe to realtime listener
    let unsub = onSnapshot(doc(db, "lastMsg", id), doc => {
      setUnread(doc.data());
    })
    
    //unsub from realtime listener
    return () => unsub()
  }, [])

  console.log(unread);

  return (
    <div className="user-box" onClick={() => selectChat(user)}>
        <div className="user-details">
            <img className="avatar" src={user.avatar || Img } alt="profile-picture"></img>
            <div>{user.name}</div>
        </div>
        <div className={`online-indicator ${user.isOnline ? "online" : "offline"}`}></div>
    </div>
  )
}

export default User