import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Img from "../images/avatar-picture.webp"
import Icon from '@mdi/react'
import { mdiCameraPlus, mdiLoading, mdiArrowLeft } from '@mdi/js';
import { storage, db, auth } from '../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
        setLoading(true);
        const imgRef = ref(storage, `profilePicture/${new Date().getTime()} - ${profilePicture.name}`)

        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath))
          }
          const pic = await uploadBytes(imgRef, profilePicture)
          const url = await getDownloadURL(ref(storage, pic.ref.fullPath))
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: pic.ref.fullPath
          })

          setLoading(false);
          setProfilePicture("");
        } catch (error) {
          console.log(error)
        }
      };
      uploadProfilePicture()
    }
  }, [profilePicture])

  return user ? (
    <>
      <div className="profile-page">
        <Link to="/chat">
          <Icon path={mdiArrowLeft}
          size={1.5}
          title="Back"
          className="back-to-chat"
          color="black"/>
        </Link>
        <div className="profile-container">
          {loading ? (
            <Icon path={mdiLoading}
            size={3}
            title="Loading"
            className="profile-loading-icon"
            color="#0084ff"
            spin/>
          ) : (
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
          )}
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{`Member since: ${user.createdAt.toDate().toDateString()}`}</p>
          </div>
        </div>
      </div>
    </>
  ) : null
}

export default UserProfile