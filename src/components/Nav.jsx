import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import "../styles/Nav.css"

const Nav = () => {
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false
    })
    await signOut();
  }

  const navigate = useNavigate();

  return (
    <header>
        <div className="app-title">CLICK</div>
        {auth.currentUser? (
          <div>
            <p>{`Hello`}</p>
            <button className="nav-button" onClick={handleSignOut}>Logout</button>
          </div>
          ) : (
          <button className="nav-button">Login</button>
        )}
    </header>
  )
}

export default Nav