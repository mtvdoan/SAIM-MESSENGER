import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import logo1 from "../images/logo1.png";
import io from "socket.io-client";
import LoginPage from "./LoginPage";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";
import aolemoji from "../images/aolemoji.png";
import { ReactSession } from "react-client-session";

const Chat = (props) => {
    const { user, setUser, socket } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const email = localStorage.getItem("email");
    const screenNameAndPassword = JSON.parse(localStorage.getItem(email));
    console.log("Chat.jsx:", email, screenNameAndPassword);
    const screenName = screenNameAndPassword["screenName"];
    const stringScreenName = JSON.stringify(screenName);
    const [lockedStringSNForChat, setlockedStringSNForChat] = useState([]);
    console.log(`currentUser logged In is: ${screenName}`);

    useEffect(() => {
        socket.on("chat message", (data) => {
            console.log("Got your message");
            setMessages((prevState) => [...prevState, data]);
        });
        return () => setUser({ ...user, room: "" });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Sending private message");
        socket.emit("private_message", {
            user: user.username,
            room: user.room,
            message: currentMessage,
        });
    };

    const sN = () => {
        setlockedStringSNForChat.push(stringScreenName);
        console.log(stringScreenName);
    };
    const awayMessageButtonHandler = () => {
        navigate("/awayMessages");
    };

    const navigate = useNavigate();
    const [screenNameChat, setScreenNameChat] = useState(stringScreenName);
    // const [roomNumber, setRoomNumber] = useState('');

    // const [screenName, setScreenName] = useState();
    // const [messages, setMessages] = useState([]);

    // const handleScreenNameChange = (event) => {
    //     setScreenName(event.target.value);
    // };

    // const handleRoomNumberChange = (event) => {
    //     event.preventDefault();
    //     setRoomNumber(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setSocket(io(`http://localhost:3001?room=${roomNumber}&screenName=${screenName}`));
    //     console.log(stringScreenName);
    // };

    // const handleMessageChange = (event) => {
    //     event.preventDefault();
    //     setInput(event.target.value);

    // };

    // const [input, setInput] = useState('');

    // const handleMessageSubmit = (event) => {
    // event.preventDefault();
    //     if (input) {
    //         socket.emit('chat message', { sender: props.currentUser, message: input });
    //         setInput('');
    //     }
    // };

    // React.useEffect(() => {
    //     if (socket) {
    //         socket.on('chat message', (data) => {
    //             setMessages([...messages, data]);
    //             console.log("reactuseeffect", messages, data)
    //         });
    //     }
    // }, [socket, messages]);

    const handleLogOutClick = () => {
        JSON.parse(localStorage.getItem(email));

        localStorage.removeItem("loggedIn");

        console.log(`${screenName} has been logged out.`);
        alert(`${screenName} has been successfully logged out! 👋`);
        navigate("/");
    };

    return(

        <>
                <div className=" container border p-4 border-dark d-flex flex-column gap-2 bg-dark" style={{height: "500px"}}>
                <div className="border p-3 border-dark text-start bg-light h-100" style={{minHeight: "300px"}} >
                    {messages.map((m, i) => (
                        <p key={i}> {m.message}</p>
                    ))}
                </div>
                <form onSubmit={sendMessage}>
                    <input type="text" onChange={(e) => setCurrentMessage(e.target.value)} className="form-control" />
                </form>
            </div>
        </>
    )
        // <div>
        //     <div className="">
        //         <nav className=" whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-2.5 rounded-sm shadow-lg fill-indigo-400border-2 bg-blue-400">
        //             <div className="container flex flex-wrap items-center justify-between mx-auto">
        //                 <div className="flex items-center">
        //                     <img
        //                         src={man}
        //                         className=" h-20 w-25"
        //                         alt="Flowbite Logo"
        //                     />
        //                     <h1 className="text-4xl font-extrabold text-white dark:text-white">
        //                         SAIM - MESSENGER 👋
        //                     </h1>
        //                 </div>
        //                 <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-400">
        //                     <h1 className="text-2xl font-extrabold text-white dark:text-white">
        //                         @ {lockedStringSNForChat}
        //                     </h1>
        //                 </p>
        //                 <div
        //                     className="hidden w-full md:block md:w-auto"
        //                     id="navbar-default"
        //                 ></div>
        //             </div>
        //         </nav>
        //     </div>
        //     <div className="items-center m-2 inline-flex">
        //         <span className=" block max-w-xs max-h-sm p-2 scale-90 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 mt-2 m-auto">
        //             <img src={logo1} style={{}} alt="logo1" />
        //             <hr />
        //             <div className="p-2 flex items-start py-4">
        //                 <a
        //                     href="#_"
        //                     class="relative inline-block px-4 py-2 font-medium group"
        //                     onClick={awayMessageButtonHandler}
        //                 >
        //                     <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        //                     <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        //                     <span class="relative text-black group-hover:text-white">
        //                         Away Messages 😂
        //                     </span>
        //                 </a>
        //             </div>
        //         </span>

        //         <div
        //             className="inline-flex overflow-y-auto big-white rounded-lg p-10 shadow-xl max-w-md m-auto p-2"
        //             style={{ maxHeight: "500px" }}
        //         >
        //             {/* {!socket ? (
        //                     <form onSubmit={sendMessage}>
        //                         <h1>Ready to chat? 😊</h1>
        //                         <div className="grid gap-6 mb-6 md:grid-cols-2">
        //                         <div>
        //                             <label for="screenName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Screen Name</label>
        //                             <input type="text" disabled  id="first_name" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sN}/>
        //                         </div>
        //                         <div>
        //                             <label for="roomNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Room #</label>
        //                             <input type="number"  id="roomNumber" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#" required/>
        //                         </div>
        //                         </div>
        //                         <button className="scale-75 relative inline-block text-lg group">
        //                             <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        //                                 <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        //                                 <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        //                                 <span className="relative">Let's Chat  💬</span>
        //                             </span>
        //                             <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        //                         </button>
        //                     </form>
        //                         ) : 
        //                         ( */}
        //             <div className="">
        //                 <div className=" bg-blue-500 text-white p-4 text-center">
        //                     {stringScreenName} is chatting...
        //                 </div>
        //                 <div className="fluid flex-col" id="messages">
        //                     {messages.map((m, i) => (
        //                         <p key={i}>
        //                             {m.user}: {m.message}
        //                         </p>
        //                     ))}
        //                     {/* {
        //                                             messages.map((message, index) => (
        //                                             <p key={index}>{stringScreenName}: {message.message}</p>
        //                                         ))
        //                                     } */}
        //                 </div>
        //                 <div className="fluid">
        //                     <form id="form" onSubmit={sendMessage}>
        //                         <input
        //                             type="text"
        //                             onChange={(e) =>
        //                                 setCurrentMessage(e.target.value)
        //                             }
        //                             className="form-control"
        //                         />
        //                         <div
        //                             type="button"
        //                             className=" fluid inline align-right scale-75"
        //                         >
        //                             <button className="relative inline-block text-lg group">
        //                                 <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        //                                     <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        //                                     <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        //                                     <span className="relative">
        //                                         Send
        //                                     </span>
        //                                 </span>
        //                                 <span
        //                                     className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
        //                                     data-rounded="rounded-lg"
        //                                 ></span>
        //                             </button>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
                    
        //         </div>
        //         <button
        //             className="btn fill-red-600"
        //             onClick={handleLogOutClick}
        //         >
        //             LOGOUT
        //         </button>

        //         {/* <div className="m-auto">
        //         <header class="p-1 bg-blue-800 text-white text-center">
        //             <div className="flex justify-center max-h-7  mr-0 w-auto">
        //             <h1 class="font-extrabold text-gray-900 md:text-2xl  dark:text-white">📟  Register to 💬 SAIM-MESSENGER 😂 ! </h1>
        //             <img className="p-0 m-0 align-right flex m-auto" style={{height: "100px", width: "150px"}} src={aolemoji} alt="aolemoji"/>
        //             </div>
        //             <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">A millennial's utopia.</p>
        //         </header>
        //         <main class="m-auto">
        //             <div class="inline-flex ">
        //                 <div className="flex-row scale-75 fluid big-white rounded-lg p-10 mt-auto shadow-xl max-w-md m-auto">
        //                     <img className="p-2" src={logo1} alt="logo"/>
        //                     <div className=" border-2 border-blue-300 rounded-lg p-2">
        //                         <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        //                             <li class="mr-2">
        //                                 <a href="#" class="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" aria-current="page">Online</a>
        //                             </li>
        //                         </ul>
        //                         <div className="tab-content" id="tabs-tabContent">
        //                             <div className="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
                                        
        //                             </div>
        //                         </div>
        //                     </div>
                  
        //                     <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">SAIM MESSENGER™</a>. All Rights Reserved.  </span>
        //                 </div>
                    
        //         </main>
        //     </div> */}
        //     </div>
        // </div>
    
};

export default Chat;
