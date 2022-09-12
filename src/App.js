import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import Chat from "./components/Chat";
import UserProfile from "./components/UserProfile";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth" element={<Home />} />
                    <Route path="/chat" element={<PrivateRoute />}>
                        <Route path="/chat" element={<Chat />} />
                    </Route>
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<UserProfile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
