import React, { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Img from "../images/unisex-avatar.png"
import "../styles/User.css"

const User = ({ user, selectChat, currentUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  // Searches database for last sent message (data) between two users
  useEffect(() => {
    const id = currentUser > user2 ? `${currentUser + user2}` : `${user2 + currentUser}`
    // subscribe to realtime listener
    let unsub = onSnapshot(doc(db, "lastMsg", id), doc => {
      setData(doc.data());
    })
    
    //unsub from realtime listener
    return () => unsub()
  }, [])

  return (
    <div className={`user-box ${chat.name === user.name && "highlighted-user"}`} onClick={() => selectChat(user)}>
        <div className="user-details">
            <img className="avatar" src={user.avatar || Img } alt="profile-picture"></img>
            <div className="user-details-text">
              <div className="user-row"> 
                <div>{user.name}</div>
                {data?.from !== currentUser && data?.unread && (<div className="new-message">New</div>)}
              </div>
              {data && (
                <p style={{ fontSize: "12px" }}>
                  <strong>{data.from === currentUser ? "You: " : null}</strong>{data.message.length < 12 ? data.message : `${data.message.slice(0, 12)}...`}
                </p>
              )}
            </div>
        </div>
        <div className={`online-indicator ${user.isOnline ? "online" : "offline"}`}></div>
    </div>
  )
}

export default User