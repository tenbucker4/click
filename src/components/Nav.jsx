import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
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
        <h3 className="app-title">CLICK</h3>
        {user? (
          <div>
            <button className="nav-button" onClick={handleSignOut}>Logout</button>
          </div>
          ) : (
          <button className="nav-button" onClick={() => navigate("/auth")}>Login</button>
        )}
    </header>
  )
}

export default Nav