import React, { useState, useEffect } from 'react'
import Img from "../images/avatar-picture.webp"
import Icon from '@mdi/react'
import { mdiCameraPlus } from '@mdi/js';
import { storage, db, auth } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    // Actual image url
    getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    })

    // Path to image url
    if (profilePicture) {
      const uploadProfilePicture = async () => {
        const imgRef = ref(storage, `profilePicture/${new Date().getTime()} - ${profilePicture.name}`)

        try {
          const pic = await uploadBytes(imgRef, profilePicture)
          const url = await getDownloadURL(ref(storage, pic.ref.fullPath))
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: pic.ref.fullPath
          })
  
          setProfilePicture("")
        } catch (error) {
          console.log(error)
        }
      };
      uploadProfilePicture()
    }
  }, [profilePicture])

  return user ? (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-picture">
          <img src={user.avatar || Img}></img>
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
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{`Member since: ${user.createdAt.toDate().toDateString()}`}</p>
        </div>
      </div>
    </div>
  ) : null
}

export default UserProfile