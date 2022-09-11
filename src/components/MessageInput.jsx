import React from 'react'
import Icon from '@mdi/react'
import { mdiCameraPlus } from '@mdi/js';

const MessageInput = () => {
  return (
    <form className="message-form">
        <div className="message-box">
            <Icon path={mdiCameraPlus}
                title="Image Upload"
                className="image-upload-icon"
                size={1}
                color="black"/>
        </div>
    </form>
  )
}

export default MessageInput