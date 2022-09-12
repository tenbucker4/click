import React from 'react'
import Moment from "react-moment";
import "../styles/Message.css";

const Message = ({ msg, currentUser }) => {
  return (
    <div className={`message-wrapper ${msg.from === currentUser ? "sender" : "recipient"}`}>
        <p>
            {msg.image ? <img src={msg.image} alt={msg.message}></img> : null}
            {msg.message}
            <br/>
            <small>
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </small>
        </p>
    </div>
  )
}

export default Message