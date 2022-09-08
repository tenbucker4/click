import React from 'react'
import "../styles/Login.css"
import Icon from '@mdi/react'
import { mdiGoogle } from '@mdi/js';
import { mdiFacebook } from '@mdi/js';

const LoginPage = () => {
  return (
    <div className="login-page">
        <div className="login-container">
            <div className="login-header">
                <h3>Welcome to <span style={{ color: "blue"}}>Click!</span></h3>
                <p>Please sign in to continue</p>
            </div>
            <div className="login-buttons">
                <button className="sign-in">
                    <Icon path={mdiGoogle}
                        title="Google"
                        color="green"
                        className="google-icon"
                    />
                    <span>Sign In With Google</span>
                </button>
                <p>or</p>
                <button className="sign-in">
                    <Icon path={mdiFacebook}
                        title="Google"
                        color="blue"
                        className="facebook-icon"
                    />
                    <span>Sign In With Facebook</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage