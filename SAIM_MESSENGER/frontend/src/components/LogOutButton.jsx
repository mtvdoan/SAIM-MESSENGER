import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import logo1 from "../images/logo1.png";
import io from "socket.io-client";
import { useNavigate, Link } from "react-router-dom";
import aolemoji from "../images/aolemoji.png";

const LogOutButton = () => {
    const { user, setUser, socket } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("wheeeeeee4e");
        socket.on("private_message_response", (data) => {
            console.log("what is my socket", socket);
            console.log("Got your message");
            console.log(
                "user should have have received data and confirm",
                data
            );
            setMessages((prevState) => [...prevState, data]);
        });
        console.log("what is my socket.id", socket.id);
        return () => setUser({ ...user });
    }, []);
    const handleLogOutClick = () => {
        
        console.log(`${user.screenName} has been logged out.`);
        alert(`${user.screenName} has been successfully logged out! 👋`);
        navigate("/");
    };

    return (
        <div>
            <div className="flex justify-center">
                <a
                    href
                    onClick={handleLogOutClick}
                    className=" cursor-pointer relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                        Log Out
                    </span>
                </a>
            </div>
        </div>
    );
};

export default LogOutButton;
