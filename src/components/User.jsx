import React, { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Img from "../images/avatar-picture.webp"
import "../styles/User.css"

const User = ({ user, selectChat, currentUser, chat }) => {
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

  return (
    <div className={`user-box ${chat.name === user.name && "highlighted-user"}`} onClick={() => selectChat(user)}>
        <div className="user-details">
            <img className="avatar" src={user.avatar || Img } alt="profile-picture"></img>
            <div className="user-details-text">
              <div>{user.name}</div>
              {unread && (
                <p style={{ fontSize: "12px" }}>{unread.message}</p>
              )}
            </div>
        </div>
        <div className={`online-indicator ${user.isOnline ? "online" : "offline"}`}></div>
    </div>
  )
}

export default User