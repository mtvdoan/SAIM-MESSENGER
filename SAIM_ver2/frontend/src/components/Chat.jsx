import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import logo1 from "../images/logo1.png";
import io from "socket.io-client";
import { useNavigate, Link } from "react-router-dom";
import aolemoji from "../images/aolemoji.png";
import "../App.css";
import SvgComponent from "./SvgComponent";
import Boop from "./Boop";
const Chat = (props) => {
    function helper(message, object) {
        console.log(message, object);
        return object;
    }
    const { user, setUser, socket } = useContext(UserContext);
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
        window.scrollTo(0, document.body.scrollHeight);
    };
    const awayMessageButtonHandler = () => {
        navigate("/awayMessages");
    };
    const handleLogOutClick = () => {
        console.log(`${user.screenName} has been logged out.`);
        alert(`${user.screenName} has been successfully logged out! 👋`);
        navigate("/");
    };

    return (
        <>
            <div>
                <div className="">
                    <nav className="whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-10 rounded-2xl shadow-2xl fill-indigo-400border-2  bg-blue-400">
                        <div className="container flex flex-wrap items-center justify-between mx-auto">
                            <div className="flex items-center justify">
                                <h1 className="text-5xl mr-44 font-extrabold text-white dark:text-white">
                                    SAIM - MESSENGER
                                </h1>
                            </div>
                            <Boop rotation={"10"} timing={"100"}>
                                <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-400">
                                    <mark className="grid grid-cols-2 content-center m-auto m-4 p-4 bg-blue-800 rounded-xl shadow-lg h-28 w-80">
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
                                        />
                                    </mark>
                                </p>
                            </Boop>
                        </div>
                    </nav>
                </div>
                <div className="grid grid-cols-2 content-center p-4">
                    <div>
                        <span className=" block max-h-sm p-2 bg-white rounded-lg shadow-2xl hover:bg-gray-100  dark:border-gray-700 mt-2 m-auto" style={{width:"600px"}}>
                            <img
                                className="mb-6"
                                src={logo1}
                                style={{height:'', width:'800px'}}
                                alt="logo1"
                            />
                            <div className="m-2 border-2 border-black-400 overflow-y-auto" style={{height:"400px"}}>
                                <p>Buddies</p>
                            </div>
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
                        </span>
                        <div className="flex justify-center m-4">
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
                        </div>
                    </div>
                    <div
                        className="rounded-lg shadow-2xl m-auto p-2 grid grid-col-2 content-center"
                        style={{ width: "800px" }}
                    >
                        <div
                            className="border-1 border-black bg-gray-300 m-2"
                            style={{ width: "auto", height: "700px" }}
                        >
                            <h2
                                className="text-xl h-12 p-4 font-extrabold dark:text-white bg-blue-500 border-black border-2"
                                style={{ width: "auto" }}
                            >
                                {user.screenName} is chatting...
                            </h2>
                            <div
                                className=""
                                style={{
                                    maxHeight: "400px",
                                    width: "auto",
                                    height: "800px",
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
                                            height: "400px",
                                            overflow: "visible",
                                            scrollbarWidth: "700px",
                                            whitespace: "wrap",
                                            maxHeight: "500px",
                                        }}
                                    >
                                        <div
                                            className="overflow-auto border-1 border-black m-4"
                                            style={{ height: "400px" }}
                                        >
                                            {messages.map((m, i) => (
                                                <div
                                                    className="whitespace-normal rt-tr-group overflow-auto"
                                                    style={{
                                                        fontSize: "24px",
                                                        display: "flex",
                                                        whitespace: "wrap",
                                                    }}
                                                    key={i}
                                                >
                                                    <div
                                                        style={{}}
                                                        className="font-extrabold mr-4 whitespace-normal "
                                                    >
                                                        {m.user}:
                                                    </div>
                                                    {m.message}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-6 m-2">
                                        <form
                                            id="chatEntry"
                                            onSubmit={sendMessage}
                                        >
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setCurrentMessage(
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <div className="">
                                                <button className="m-2 relative inline-block text-lg group grid grid-col-1 content-center">
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
