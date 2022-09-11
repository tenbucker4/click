import React from 'react'
import Icon from '@mdi/react'
import { mdiCameraPlus } from '@mdi/js';
import { mdiSend } from '@mdi/js';
import "../styles/MessageInput.css"

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="message-form">
        <div className="message-box">
            <label htmlFor="attachment">
                <Icon path={mdiCameraPlus}
                    title="Image Upload"
                    className="attach-message-image"
                    size={1}
                    color="black"/>
            </label>
            <input id="attachment" type="file" accept="image/*" style={{ display: "none" }}></input>
            <input placeholder="Aa"></input>
            <Icon path={mdiSend}
                title="Image Upload"
                className="send-message"
                size={1.5}
                color="black"/>
        </div>
    </form>
  )
}

export default MessageInput