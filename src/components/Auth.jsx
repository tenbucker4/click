import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, updateDoc, doc, Timestamp, getDoc } from "firebase/firestore"
import { auth, db } from '../firebase';
import "../styles/Auth.css"

const Auth = () => {
  const navigate = useNavigate();

  const initState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    loading: false
  }

  const [userData, setUserData] = useState(initState)

  const { name, email, password, confirmPassword, error, loading } = userData;

  const [isSignUp, setIsSignUp] = useState(false);

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

      setUserData(initState);

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

      setUserData({initState});

      navigate("/chat");

    } catch (error) {
      setUserData({ ...userData, error: error.message, loading: false });
    }
  }

  return (

    <div className="login-container">
        <div className="login-header">
            <div>Welcome to <span style={{ color: "white"}}>CLICK</span></div>
        </div>
          {isSignUp? (
                <form className="auth-form" onSubmit={handleSignUp} autoComplete="off">
                  <input id="name" placeholder="Name" name="name" onChange={handleChange} maxLength={25}></input>
                  <input id="email" type="email" placeholder="Email" name="email" onChange={handleChange} defaultValue={email}></input>
                  <input id="password" type="password" placeholder="Password" name="password" onChange={handleChange} defaultValue={password}></input>
                  <input id="confirmPassword" type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} defaultValue={confirmPassword}></input>
                  {error? <p style={{ color: "black", fontSize: "12px" }}>{error}</p> : null}
                  {loading? <p style={{ color: "black", fontSize: "12px" }}>Processing...</p> : null}
                  <button type="submit" className="sign-in" disabled={loading}>
                    <span>Register</span>
                  </button>
                </form>
          ) : ( <form className="auth-form" onSubmit={handleSignIn} autoComplete="off">
                  <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                  <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                  {error? <p style={{ color: "black", fontSize: "12px" }}>{error}</p> : null}
                  {loading? <p style={{ color: "black", fontSize: "12px" }}>Logging in...</p> : null}
                  <button type="submit" className="sign-in" onClick={handleSignIn} disabled={loading}>
                    <span>Login</span>
                  </button>
                </form>
          )}
        {isSignUp? (<p>Already have an account? <span className="toggle-sign-up" style={{ color: "white", fontWeight:"bold"}} onClick={() => setIsSignUp(isSignUp ? false : true)}>Sign In</span></p>) : (
          <p>Need an account? <span className="toggle-sign-up" style={{ color: "white", fontWeight:"bold"}} onClick={() => setIsSignUp(isSignUp ? false : true)}>Sign Up</span></p>
        )}
        
    </div>
  )
}

export default Auth