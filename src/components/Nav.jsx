import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Img from "../images/unisex-avatar.png"
import "../styles/Nav.css"

const Nav = () => {
  const { user } = useContext(AuthContext)
  const [profile, setProfile] = useState("")
  const navigate = useNavigate();

  // Toggles online status to offline, signs user out, navigates to login page
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false
    })
    await signOut(auth);
    navigate("/click/auth");
  }

  // Gets online profile to display name and profile picture
  useEffect(() => {
    if (user) {
      getDoc(doc(db, "users", auth?.currentUser?.uid)).then(docSnap => {
      if (docSnap.exists) {
        setProfile(docSnap.data());
      }
    })
    }
  })


  return (
    <header>
        <div className="app-title">CLICK</div>
        <div className="nav-user-details">
          {profile.isOnline ? <p style={{ fontSize: "14px"}}>{`Hello, ${profile.name}`}</p> : null}
          {profile.isOnline ? (
            <Link to="/click/profile">
              <img className="nav-avatar" src={profile.avatar || Img}></img>
            </Link>
          ) : null}
          {profile.isOnline ? (
            <div>
              <button className="nav-button" onClick={handleSignOut}>Logout</button>
            </div>
            ) : (
            <button className="nav-button" onClick={() => navigate("/click/auth")}>Login</button>
          )}
        </div>
    </header>
  )
}

export default Nav