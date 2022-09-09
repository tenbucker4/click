import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Img from "../images/avatar-picture.webp"
import "../styles/Nav.css"

const Nav = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false
    })
    await signOut(auth);
    navigate("/auth");
  }


  return (
    <header>
        <div className="app-title">CLICK</div>
        <div className="nav-user-details">
          {user ? <p style={{ fontSize: "14px"}}>{`Hello, ${user.name}`}</p> : null}
          {user ? (
            <Link to="/profile">
              <img className="nav-avatar" src={user.avatar || Img}></img>
            </Link>
          ) : null}
          {user? (
            <div>
              <button className="nav-button" onClick={handleSignOut}>Logout</button>
            </div>
            ) : (
            <button className="nav-button" onClick={() => navigate("/auth")}>Login</button>
          )}
        </div>
    </header>
  )
}

export default Nav