import React, { useContext } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./contexts/AuthContext";
import "./styles/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
                    <Route path="/chat" element={<PrivateRoute />}>
                        <Route path="/chat" element={<Chat />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
