import React, { useRef } from 'react'
import { useEffect } from 'react';
import Moment from "react-moment";
import "../styles/Message.css";

const Message = ({ msg, currentUser }) => {
    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [msg]);

    return (
        <div className={`message-wrapper ${msg.from === currentUser ? "sender" : "recipient"}`} ref={scrollRef}>
            <div className='message-contents'>
                <p>{msg.image ? <img src={msg.image} alt={msg.message}></img> : null}</p>
                <p>{msg.message}</p>
                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </div>
        </div>
    )
}

export default Message