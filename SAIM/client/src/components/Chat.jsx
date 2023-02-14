import React, { useState } from 'react';
import logo1 from '../images/logo1.png';
import io from 'socket.io-client';
import LoginPage from './LoginPage';
import LogOut from './LogOut';
import {useNavigate} from 'react-router-dom';

const Chat = (props)=> {
    
    const navigate = useNavigate();
    const [roomNumber, setRoomNumber] = useState('');
    const [socket, setSocket] = useState(null);

    // const [screenName, setScreenName] = useState();
    const [messages, setMessages] = useState([]);


    // const handleScreenNameChange = (event) => {
    //     setScreenName(event.target.value);
    // };

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSocket(io(`http://localhost:3001?room=${roomNumber}&screenName=${screenName}`));
        console.log(screenName);
    };

    const handleMessageChange = (event) => {
        setInput(event.target.value);
    };

    const [input, setInput] = useState('');

    const handleMessageSubmit = (event) => {
    event.preventDefault();
        if (input) {
            socket.emit('chat message', { sender: props.currentUser, message: input });
            setInput('');
        }
    };

    React.useEffect(() => {
        if (socket) {
            socket.on('chat message', (data) => {
                setMessages([...messages, data]);
            });
        }
    }, [socket, messages]);

    const handleLogOutClick = () => {
        const userData = JSON.parse(localStorage.getItem("loggedIn"));

        localStorage.removeItem('loggedIn');
        sessionStorage.removeItem('loggedIn');

        console.log(`${screenName} has been logged out.`);
        alert(`Logging out! ${userData}}`);
        navigate("/");
    };

    const email = localStorage.getItem("email");
    const userAndPassword = JSON.parse(localStorage.getItem(email));
    console.log("Chat.jsx:", email, userAndPassword);
    const screenName = userAndPassword["screenName"];

    return (
        <>
            <p>HELLO {screenName}</p>
            <nav className=" bg-blue m-auto px-2 sm:px-4  dark: bg-blue-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto scale-75">
                    <div className="center fluid">
                        <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl text-center dark:text-white">Welcome!</h1>
                    </div>
                </div>
                <p className="scale-75 mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">A space for millennials to chat and share hilarious away messages!</p>
            </nav>    
            <div class="grid grid-cols-2 gap-4">
                <div className="flex-row scale-75 fluid big-white rounded-lg p-10 mt-auto shadow-xl max-w-md m-auto">
                    <img src={logo1} alt="logo"/>
                    <div className="">

                    </div>
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">SAIM MESSENGER™</a>. All Rights Reserved.  </span>
                </div>

            <div className=' overflow-y-auto flex-row  big-white rounded-lg p-10 shadow-xl max-w-md m-auto p-2' style={{maxHeight:"500px"}}>
                {!socket ? (
                    <form onSubmit={handleSubmit}>
                        <h1>Welcome, </h1>
                        <label>
                            Screen Name:{screenName}
                        </label>
                        <label>
                            Chat Room#:
                            <input type="text" value={roomNumber} onChange={handleRoomNumberChange} />
                        </label>
                        <button type="submit">Submit</button>
                        </form>
                        ) : 
                        (
                        <div  className=""  >
                            <div className=" bg-blue-500 text-white p-2 text-center">{screenName} is chatting in Room: #{roomNumber}</div>
                                <div className="fluid flex-col" id="messages">
                                    {
                                        messages.map((message, index) => (
                                        <p key={index}>{message.sender}: {message.message}</p>
                                    ))
                                }
                                </div>
                            <div className="fluid">
                                <form id="form" onSubmit={handleMessageSubmit}>
                                    <input className="" id="input" autoComplete="off" value={input} onChange={handleMessageChange} />
                                    <div type="button" className=" fluid inline align-right scale-75">
                                    <button className="relative inline-block text-lg group">
                                        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                            <span className="relative">Send</span>
                                        </span>
                                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                    </button>
                                    </div>
                                </form>
                            </div>
                    </div>
                    )}
                    
            </div>
            </div>

        <button onClick={handleLogOutClick} class="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Log Out</button>
        
       </>
    );
}

export default Chat;
