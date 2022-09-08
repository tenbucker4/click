import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Get user from Firebase and set to state
    useEffect(() => {
        auth.onAuthStateChanged((profile) => {
            setProfile(profile);
            setLoading(false);
        });
    }, [profile]);

    // We need a value object when working with auth contexts
    const value = { profile };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
