import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import Chat from "./components/Chat";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/auth" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
