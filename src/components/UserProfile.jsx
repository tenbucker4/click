import React, { useState } from 'react'
import Img from "../images/avatar-picture.webp"
import Icon from '@mdi/react'
import { mdiCameraPlus } from '@mdi/js';
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");
  console.log(profilePicture);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-picture">
          <img src={Img}></img>
          <div className="image-overlay">
            <label htmlFor="photo">
              <Icon path={mdiCameraPlus}
              title="Image Upload"
              className="image-upload-icon"
              size={1}
              color="white"/>
            </label>
            <input id="photo" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setProfilePicture(e.target.files[0])}></input>
          </div>
        </div>
        <div className="user-details">
          <h3>Username</h3>
          <p>User email</p>
          <p>Joined:</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile