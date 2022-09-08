import React from "react";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import Home from "./components/Home";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
