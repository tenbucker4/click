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
                    <Route
                        exact
                        path="/click"
                        element={<Navigate to="/click/auth" />}
                    />
                    <Route path="/click/auth" element={<Home />} />
                    <Route path="/click/chat" element={<PrivateRoute />}>
                        <Route path="/click/chat" element={<Chat />} />
                    </Route>
                    <Route path="/click/profile" element={<PrivateRoute />}>
                        <Route
                            path="/click/profile"
                            element={<UserProfile />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
