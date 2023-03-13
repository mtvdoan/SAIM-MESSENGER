import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Boop from "./Boop";
const MyChatRoomsList = (props) => {
    const { user, socket } = useContext(UserContext);
    const [myChatRooms, setMyChatRooms] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/rooms", { withCredentials: true })
            .then((res) => {
                console.log("ALL CHAT ROOMS", res);
                setMyChatRooms(res.data)
            
            })
            .catch((err) => console.log(err));
    }, []);

  return (
    <div>{myChatRooms}</div>
  )
}

export default MyChatRoomsList