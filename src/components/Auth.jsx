import React, { useState } from 'react';
import "firebase/compat/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import "../styles/Auth.css"

const Auth = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: null,
  })

  const { name, email, password, confirmPassword, error } = userData;

  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
         return setUserData({ ...userData, error: "Passwords do not match"})
      } 
      if (!name || !email || !password || !confirmPassword) {
        return setUserData({ ...userData, error: "Please fill out all fields"})
      }
    }

    if (!isSignUp) {
      if (!email || !password) {
        return setUserData({ ...userData, error: "Please fill out both fields"})
      }
    }

    console.log(userData)

    try {
      
    } catch (error) {
      
    }
  }

  return (
        <div className="login-container">
            <div className="login-header">
                <h3>Welcome to <span style={{ color: "#0084ff"}}>CLICK</span></h3>
            </div>
            <form onSubmit={handleSubmit}>
              {isSignUp? (
                  <>
                      <input placeholder="Name" name="name" onChange={handleChange}></input>
                      <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                      <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                      <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange}></input>
                      {error? <p style={{ color: "red", fontSize: "12px" }}>{error}</p> : null}
                      <button type="submit" className="sign-in">
                        <span>Register</span>
                      </button>
                  </>
              ) : ( <>
                      <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                      <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                      {error? <p style={{ color: "red", fontSize: "12px" }}>{error}</p> : null}
                      <button type="submit" className="sign-in">
                        <span>Login</span>
                      </button>
              </>
              )}
            </form>
            {isSignUp? (<p>Already have an account? <span className="toggle-sign-up" style={{ color: "#0084ff"}} onClick={() => setIsSignUp(isSignUp ? false : true)}>Sign In</span></p>) : (
              <p>Need an account? <span className="toggle-sign-up" style={{ color: "#0084ff"}} onClick={() => setIsSignUp(isSignUp ? false : true)}>Sign Up</span></p>
            )}
            
        </div>
  )
}

export default Auth