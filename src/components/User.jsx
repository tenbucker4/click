import React from 'react'
import Img from "../images/avatar-picture.webp"
import "../styles/User.css"

const User = ({ user }) => {
  return (
    <div className="user-box">
        <img className="avatar" src={user.avatar || Img } alt="profile-picture"></img>
        <div>{user.name}</div>
        <div className={`online-indicator ${user.isOnline ? "online" : "offline"}`}></div>
    </div>
  )
}

export default User