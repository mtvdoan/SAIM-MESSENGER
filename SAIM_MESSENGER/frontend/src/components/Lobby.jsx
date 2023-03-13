import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Boop from "./Boop";
const Lobby = (props) => {
    const { user, socket } = useContext(UserContext);
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/rooms", { withCredentials: true })
            .then((res) => {
                setRooms(res.data);
                console.log("chatrooms", res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const joinRoom = (e) => {
        e.preventDefault();
        axios
            .put(
                "http://localhost:8000/api/rooms/add/" + roomId,
                { userid: user.id },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(
                    `Thanks for joining room name: ${res.data.name}! The pass key is: ${res.data.passKey}.`
                );
                alert(
                    `Thanks for joining room name: ${res.data.name}! The pass key is: ${res.data.passKey}.`
                );

                socket.emit("join-room", selectedRoom);
            })
            .catch((err) => console.log(err));
    };

    const onChangeHandler = (e) => {
        // e.preventDefault();
        setSelectedRoom(e.target.selectedOptions[0].innerText);
        setRoomId(e.target.value);
    };

    return (
        <>
            <div>
                <div className="h-96 border-2 border-gray-200 m-4">
                    <h1 className="text-black font-extrabold text-xl m-4">
                        Join a Room!
                    </h1>

                    <div class="relative overflow-x-auto overflow-y-auto">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Chat Room Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Host
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4">Silver</td>
                                    <td class="px-6 py-4">BUTTONS YO</td>

                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Microsoft Surface Pro
                                    </th>
                                    <td class="px-6 py-4">White</td>
                                    <td class="px-6 py-4">Laptop PC</td>
            
                                </tr>
                                <tr class="bg-white dark:bg-gray-800">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Magic Mouse 2
                                    </th>
                                    <td class="px-6 py-4">Black</td>
                                    <td class="px-6 py-4">Accessories</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-black font-extrabold text-xl m-4">
                    Join a Room!
                </h1>
                <div className="container text-black">
                    <form onSubmit={joinRoom} className="m-4">
                        <div className="">
                            <select
                                onChange={onChangeHandler}
                                id="chatRooms"
                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Pick a Room</option>
                                {rooms.map((room, i) => (
                                    <option
                                        id={room.name}
                                        key={room._id}
                                        value={room._id}
                                    >
                                        {room.name}
                                    </option>
                                ))}
                            </select>
                            <Boop rotation={"15"} duration={"200"}>
                                <button
                                    type="submit"
                                    className="shadow-lg m-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                >
                                    Join Room
                                </button>
                            </Boop>
                        </div>
                    </form>
                </div>
                <hr />
            </div>
        </>
    );
};

export default Lobby;
