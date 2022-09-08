import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import "../styles/Home.css"

const Home = () => {
  return (
    <div className="home-page">
        <header>
            <div>Welcome to Click</div>
            <button>Login</button>
        </header>
        <main>
            <section className="contacts"></section>
            <section className="message-log"></section>
        </main>
    </div>
  )
}

export default Home