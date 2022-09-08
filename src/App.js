import React from "react";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
