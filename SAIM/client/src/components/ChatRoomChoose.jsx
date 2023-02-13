import React, {useState, useContext} from 'react'
import "../App.css";
import Chat from "./Chat";
import {UserContext} from '../context/UserContext';

const ChatRoomChoose = (props) => {
const {screenName, socket} = useContext(UserContext);
const [username, setUsername] = useState(screenName);
const [room, setRoom] = useState("");
const [showChat, setShowChat] = useState(false);
const joinRoom = () => {
    if (username !== "" && room !== "") {
    socket.emit("join_room", room);
    setShowChat(true);
    }
};
return (
<div>
{!showChat ? (
<div className="joinChatContainer">
<h3>Join A Chat</h3>
<input
type="text"
placeholder="John..."
value={username}
onChange={(event) => {
setUsername(event.target.value);
}}
/>
<input
type="text"
placeholder="Room ID..."
onChange={(event) => {
setRoom(event.target.value);
}}
/>
<button onClick={joinRoom}>Join A Room</button>
</div>
) : (
<Chat username={username} room={room} />
)}
</div>
)
}

export default ChatRoomChoose;