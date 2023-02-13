import React from "react";
import {useNavigate} from 'react-router-dom';

const LogOut = ({ screenName }) => {
const navigate = useNavigate();
const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    console.log(`${screenName} has been logged out.`);
    navigate('/login');
};

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogOut;

