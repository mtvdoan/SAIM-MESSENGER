import React, { useState, useEffect } from "react";
import "../App.css";
// const dbConnect = require(".../server/config/dbConnect");  

// execute database connection 
// dbConnect();
const Chat = (props) => {
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);

useEffect(() => {
    props.socket.on("chat message", (message) => {
    setMessages([...messages, message]);
    });
}, [messages]);

const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
    props.socket.emit("chat message", `${props.username}: ${message}`);
    setMessage("");
    }
};

return (
    <div className="chatContainer">
    <h3>
        Chatting in room: {props.room} as {props.username}
    </h3>
    <div className="chatWindow">
        <p id="messages">
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </p>
    </div>
    <form id="form" action="">
        <input
            id="input"
            autoComplete="off"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
    </form>
    </div>
);
};

export default Chat;
