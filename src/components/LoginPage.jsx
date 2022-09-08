import React from 'react';
import "../styles/Login.css";
import Icon from '@mdi/react';
import { mdiGoogle } from '@mdi/js';
import firebase from "firebase/compat/app";;
import "firebase/compat/firestore"
import { auth } from "../firebase";

const LoginPage = () => {
  return (
    <div className="login-page">
        <div className="login-container">
            <div className="login-header">
                <h3>Welcome to <span style={{ color: "green"}}>Click!</span></h3>
                <p>Please sign in to continue</p>
            </div>
            <button className="sign-in" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider)}>
                    <Icon path={mdiGoogle}
                        title="Google"
                        color="green"
                        className="google-icon"
                    />
                    <span>Sign In With Google</span>
            </button>
        </div>
    </div>
  )
}

export default LoginPage