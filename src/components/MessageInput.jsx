import React from 'react'
import Icon from '@mdi/react'
import { mdiCameraPlus } from '@mdi/js';
import { mdiSend } from '@mdi/js';
import "../styles/MessageInput.css"

const MessageInput = ({ message, setMessage, sendMessage, img, setImg }) => {
  return (
    <form className="message-form" onSubmit={sendMessage}>
        <div className="message-box">
            <label htmlFor="attachment">
                <Icon path={mdiCameraPlus}
                    title="Image Upload"
                    className="attach-message-image"
                    size={1}
                    color="black"/>
            </label>
            <input id="attachment" type="file" accept="image/*" files={img} style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])}></input>
            <input value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button type="submit" className="send-message-button">
                <Icon path={mdiSend}
                    title="Image Upload"
                    className="send-message"
                    size={1}
                    color="black"/>
            </button>
        </div>
    </form>
  )
}

export default MessageInput