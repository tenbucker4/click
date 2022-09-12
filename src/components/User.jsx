import React, { useEffect, useState } from 'react'
import Img from "../images/avatar-picture.webp"
import "../styles/User.css"

const User = ({ user, selectChat, currentUser }) => {
  

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