import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore"
import { auth, db } from '../firebase';
import "../styles/Auth.css"

const Auth = () => {
  const [userData, setUserData] = useState({ 
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    loading: false
  })

  const { name, email, password, confirmPassword, error, loading } = userData;

  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setUserData({ ...userData, error: null, loading: true });

    if (!name || !email || !password || !confirmPassword) {
      return setUserData({ ...userData, error: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return setUserData({ ...userData, error: "Passwords do not match"})
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: false,
      })

      setUserData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: null,
        loading: false,
      });

      window.location.reload();

    } catch (err) {
      setUserData({ ...userData, error: err.message, loading: false });
    }

  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setUserData({ ...userData, error: null, loading: true });

    if (!email || !password) {
      return setUserData({ ...userData, error: "Please fill out both fields"})
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true
      });

      setUserData( {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: null,
        loading: false,
      });

      navigate("/chat");

    } catch (error) {
      setUserData({ ...userData, error: error.message, loading: false });
    }
  }

  return (

    <div className="login-container">
        <div className="login-header">
            <h3>Welcome to <span style={{ color: "#0084ff"}}>CLICK</span></h3>
        </div>
          {isSignUp? (
                <form onSubmit={handleSignUp}>
                  <input placeholder="Name" name="name" onChange={handleChange} defaultValue={name}></input>
                  <input type="email" placeholder="Email" name="email" onChange={handleChange} defaultValue={email}></input>
                  <input type="password" placeholder="Password" name="password" onChange={handleChange} defaultValue={password}></input>
                  <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} defaultValue={confirmPassword}></input>
                  {error? <p style={{ color: "red", fontSize: "12px" }}>{error}</p> : null}
                  {loading? <p style={{ color: "green", fontSize: "12px" }}>Processing...</p> : null}
                  <button type="submit" className="sign-in" disabled={loading}>
                    <span>Register</span>
                  </button>
                </form>
          ) : ( <form onSubmit={handleSignIn}>
                  <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                  <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                  {error? <p style={{ color: "red", fontSize: "12px" }}>{error}</p> : null}
                  {loading? <p style={{ color: "green", fontSize: "12px" }}>Logging in...</p> : null}
                  <button type="submit" className="sign-in" onClick={handleSignIn} disabled={loading}>
                    <span>Login</span>
                  </button>
                </form>
          )}
        {isSignUp? (<p>Already have an account? <span className="toggle-sign-up" style={{ color: "#0084ff"}} onClick={() => setIsSignUp(isSignUp ? false : true)}>Sign In</span></p>) : (
          <p>Need an account? <span className="toggle-sign-up" style={{ color: "#0084ff"}} onClick={() => setIsSignUp(isSignUp ? false : true)}>Sign Up</span></p>
        )}
        
    </div>
  )
}

export default Auth