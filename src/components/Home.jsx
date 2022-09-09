import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import "../styles/Home.css"
import Auth from './Auth';

const Home = () => {
  return (
    <section className="home-page">
      <Auth />
    </section>
  )
}

export default Home