import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import logo1 from "../images/logo1.png";
import io from "socket.io-client";

import { useNavigate } from "react-router-dom";
import aolemoji from "../images/aolemoji.png";

const Chat = (props) => {
    function helper(message, object){
        console.log(message,object);
        return object;
    };
    const { user, setUser, socket } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    useEffect(() => {
        console.log("wheeeeeee4e")
        socket.on("private_message_response", (data) => {
            console.log("what is my socket", socket);
            console.log("Got your message");
            console.log("user should have have received data and confirm", data);
            setMessages((prevState) => [...prevState, data]);
        });
        return () => setUser({ ...user});
    }, []);

    console.log("console io", io);
    const navigate = useNavigate();


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Sending private message");
        socket.emit("private_message", helper("testing send", 
        {
            user: user.screenName,
            // room: user.room,
            message: currentMessage,
        }), (response)=>{
            console.log(response);
        });
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
            <div className="">
                <nav className="whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-10 rounded-sm shadow-lg fill-indigo-400border-2 bg-blue-400">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <div className="flex items-center">
                            <h1 className="text-4xl font-extrabold text-white dark:text-white">
                                SAIM - MESSENGER 👋
                            </h1>
                        </div>
                        <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-400">
                            <h1 className="text-2xl font-extrabold text-white dark:text-white">
                                @ {user.screenName}
                            </h1>
                        </p>
                    </div>
                </nav>
            </div>

            <div className="grid grid-cols-2 content-center">
                <div>
                    <span className=" block max-w-xs max-h-sm p-2 scale-90 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 mt-2 m-auto">
                        <img src={logo1} style={{}} alt="logo1" />
                        <hr />
                        <div className="p-2 flex items-start py-4">
                            <a
                                href="#_"
                                class="relative inline-block px-4 py-2 font-medium group"
                                onClick={awayMessageButtonHandler}
                            >
                                <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <span class="relative text-black group-hover:text-white">
                                    Away Messages 😂
                                </span>
                            </a>
                        </div>
                    </span>
                </div>

                <div className="m-10 ">
                    <div className="">
                        <h2 class="text-xl font-extrabold dark:text-black bg-blue-500 p-4 max-w-full -mt-4 border-black border-2">
                            {user.screenName} is chatting...
                        </h2>
                    </div>

                    <div
                        className="border-2 border-black scroll-auto"
                        style={{height:"400px"}}
                        id="messages"
                    >
                        <div className="card scroll-auto text-start h-48 border-1 border-black">
                        {messages.map((m, i) => (
                            <p className="text-black" key={i}>
                                {m.user}: {m.message}
                            </p>
                        ))}
                        </div>
                    
                    <div className="mb-6 m-2">
                        <form id="chatEntry" onSubmit={sendMessage}>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setCurrentMessage(e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <div className="">
                                <button className="relative inline-block text-lg group grid grid-col-1 content-center">
                                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                        <span className="relative">Send</span>
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
            <div className="block items-center">
                <a
                    href
                    onClick={handleLogOutClick}
                    class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                >
                    <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                        Log Out
                    </span>
                </a>
            </div>
        </>
    );
};

export default Chat;
