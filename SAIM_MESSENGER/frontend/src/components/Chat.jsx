import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import logo1 from "../images/logo1.png";
import io from "socket.io-client";
import { useNavigate, Link } from "react-router-dom";
import aolemoji from "../images/aolemoji.png";
import "../App.css";
import SvgComponent from "./SvgComponent";
import Boop from "./Boop";
import UserModal from "./UserModal";
import UsersList from "./UsersList";
import axios from "axios";
import LogOutButton from "./LogOutButton";
const Chat = (props) => {
    function helper(message, object) {
        console.log(message, object);
        return object;
    }

    const [usersList, setUsersList] = useState([]);
    const { user, setUser, socket } = useContext(UserContext);
    const [screenName, setScreenName] = useState("");
    const [password, setPassword] = useState("");

    console.log("whatis ", user, socket);
    console.log("what my sn", user.screenName);
    console.log("what is socket", socket);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

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
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/")
            .then((response) =>
                setUsersList(
                    // response.data,
                    response.data.allUsers,
                    console.log("All users:", response.data.allUsers)
                )
            )
            .catch((err) => console.log(err));
    }, []);
    console.log("console io", io);
    const navigate = useNavigate();

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Sending private message");
        socket.emit(
            "private_message",
            helper("testing send", {
                user: user.screenName,
                // room: user.room,
                message: currentMessage,
            }),
            (response) => {
                console.log(response);
            }
        );
        document.getElementById("message").value = "";
    };

    const handleLogOutClick = () => {
        socket.disconnect();
        console.log(`${user.screenName} has been logged out.`);
        alert(`${user.screenName} has been successfully logged out! 👋`);
        navigate("/");
    };

    return (
        <>
            <div>
                <div className="h-auto">
                    <nav className="whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-10 rounded-2xl shadow-2xl fill-indigo-400border-2  bg-blue-400">
                        <div className="container grid grid-cols-2 content-center flex flex-wrap items-center justify-between mx-auto">
                            <div className="flex items-center justify">
                                <h1 className="text-5xl mr-44 font-extrabold text-white dark:text-white">
                                    SAIM - MESSENGER
                                </h1>
                            </div>
                            <div className="grid grid-1 contents-center ">
                                <Boop rotation={"10"} timing={"100"}>
                                    <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-400">
                                        <mark className="grid w-auto grid-cols-2 content-center m-auto m-4 p-4 bg-blue-800 rounded-xl shadow-lg h-28 w-80">
                                            <h1 className=" text-5xl font-extrabold text-white dark:text-white mt-10">
                                                @ {user.screenName}
                                            </h1>
                                            <img
                                                src={aolemoji}
                                                alt="aolemoji"
                                                style={{
                                                    height: "150px",
                                                    width: "200px",
                                                }}
                                                className=" ml-36"
                                            />
                                        </mark>
                                    </p>
                                </Boop>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="grid grid-cols-2 content-center p-4">
                    <div>
                        <span
                            className=" block max-h-sm p-2 bg-white rounded-lg shadow-2xl hover:bg-gray-100  dark:border-gray-700 mt-2 m-auto"
                            style={{ width: "600px" }}
                        >
                            <img
                                className="mb-6"
                                src={logo1}
                                style={{ height: "", width: "800px" }}
                                alt="logo1"
                            />
                            <div className="text-left">
                                <h1 className="text-4xl font-extrabold m-4 text-black">
                                    Buddies:
                                </h1>
                                <UserModal
                                    className=""
                                    userScreenName={user.screenName}
                                    userEmail={user.email}
                                />
                            </div>
                            <div className="grid grid-cols-2 content-center">
                                <div class="text-center">
                                    <a
                                        href="#_"
                                        class="relative inline-block text-lg group"
                                    >
                                        <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-black">
                                            <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                            <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
                                            <span class="relative">
                                                <Link to="/awayMessages">
                                                    Away Messages
                                                </Link>
                                            </span>
                                        </span>
                                        <span
                                            class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                                            data-rounded="rounded-lg"
                                        ></span>
                                    </a>
                                </div>
                                <div className="">
                                    <Boop rotation={"25"} timing={"100"}>
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
                                    </Boop>
                                    <Link to={"/videochatroom"}>
                                        Video Chat Room
                                    </Link>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div
                        className="rounded-xl mt-0 m-auto shadow-2xl text-xlp-2 grid grid-col-2 content-center"
                        style={{ width: "600px" }}
                    >
                        <div
                            className="border-1 rounded-xl border-black bg-gray-300"
                            style={{ width: "auto", height: "650px" }}
                        >
                            <h2
                                className=" rounded-t-lg text-3xl p-4 tracking-widest font-extrabold dark:text-white bg-blue-500 border-black border-2"
                                style={{ width: "auto" }}
                            >
                                {user.screenName} is chatting...
                            </h2>
                            <div
                                className=""
                                style={{
                                    width: "auto",
                                    height: "300px",
                                }}
                            >
                                <div
                                    className="border-2 whitespace-normal border-black overflow-auto p-2 m-4 bg-white"
                                    id="messages"
                                    style={{ maxHeight: "900px" }}
                                >
                                    <div
                                        className="rt-body whitespace-normal m-2 card overflow-y-auto border-1 border-black"
                                        style={{
                                            width: "auto",
                                            height: "300px",
                                            overflow: "visible",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        <div
                                            className="overflow-y-auto border-1 text-3xl whitespace-normal border-black m-4 overflow-x-hidden"
                                            style={{
                                                height: "300px",
                                                whiteSpace: "wrap",
                                            }}
                                        >
                                            {messages.map((m, i) => (
                                                <div
                                                    className={`text-black rt-tr-group ${
                                                        i % 2 === 0
                                                            ? "bg-gray-200"
                                                            : "bg-white"
                                                    }`}
                                                    style={{
                                                        fontSize: "24px",
                                                        display: "flex",
                                                        maxWidth: "400px",
                                                    }}
                                                    key={i}
                                                >
                                                    <div
                                                        style={{
                                                            maxWidth: "400px",
                                                            color: "red"
                                                        }}
                                                        className="whitespace-normal font-extrabold text-black mr-4 text-xl "
                                                    >
                                                        {m.user}:
                                                    </div>
                                                    <p
                                                        className=""
                                                        style={{
                                                            overflowWrap:
                                                                "break-word",
                                                        }}
                                                    >
                                                        {m.message}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* <div
                                        className="rt-body whitespace-normal m-2 card overflow-y-auto border-1 border-black"
                                        style={{
                                            width: "auto",
                                            height: "300px",
                                            overflow: "visible",

                                            whitespace: "wrap",
                                        }}
                                    >
                                        <div
                                            className="overflow-y-auto border-1 text-3xl whitespace-normal border-black m-4 overflow-x-hidden"
                                            style={{
                                                height: "300px",
                                                whiteSpace: "wrap",
                                            }}
                                        >
                                            {messages.map((m, i) => (
                                                <div
                                                    className=" text-black rt-tr-group"
                                                    style={{
                                                        fontSize: "24px",
                                                        display: "flex",
                                                        whitespace: "wrap",
                                                        maxWidth: "400px",
                                                    }}
                                                    key={i}
                                                >
                                                    <div
                                                        style={{
                                                            maxWidth: "400px",
                                                        }}
                                                        className="whitespace-normal font-extrabold text-black mr-4 text-xl "
                                                    >
                                                        {m.user}:
                                                    </div>
                                                    <p className="">
                                                        {m.message}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}
                                    <div className="mb-6 m-2">
                                        <form
                                            id="chatEntry"
                                            onSubmit={sendMessage}
                                        >
                                            <input
                                                type="text"
                                                id="message"
                                                onChange={(e) =>
                                                    setCurrentMessage(
                                                        e.target.value
                                                    )
                                                }
                                                className=" form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <div className="">
                                                <button className="m-2 relative text-lg group grid grid-col-1 content-center">
                                                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                        <span className="relative m-2">
                                                            Send
                                                        </span>
                                                    </span>
                                                    <span
                                                        className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                                                        data-rounded="rounded-lg"
                                                    ></span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
