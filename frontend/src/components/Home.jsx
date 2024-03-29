import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import io from "socket.io-client";
import { useNavigate, Link } from "react-router-dom";
import aolemoji from "../images/aolemoji.png";
import "../App.css";
import Boop from "./Boop";
import UserModal from "./UserModal";
import axios from "axios";
import useSound from "use-sound";
import WindowsXpShutDown from "../sounds/WindowsXpShutDown.mp3";
import IM from "../sounds/IM.mp3";
import CreateRoom from "./CreateRoom";
import CreatorModal from "./CreatorModal";
import Lobby from "./Lobby";
const Home = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState({
        login: {
            email: "",
            password: "",
        },
    });
    const { login } = state;
    const [usersList, setUsersList] = useState([]);
    const { user, setUser, socket } = useContext(UserContext);
    const [screenName, setScreenName] = useState("");
    const [password, setPassword] = useState("");
    const [play] = useSound(WindowsXpShutDown, { volume: 0.05 });
    const [play2] = useSound(IM);
    console.log("whatis ", user, socket);
    console.log("what my sn", user.screenName);
    console.log("what is socket", socket);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (user.id === 0) {
            props.setAuthorized("You have to be logged in to view this page");
            alert("You need to be logged in to view this page");
            console.log("testing unauth");
            navigate("/");
        }
    }, []);
    const findOneUser = (userId) => {
        axios
            .get("http://localhost:8000/api/users/" + userId)
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        console.log("Test for useEffect with socket.on()");
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
            .get("http://localhost:8000/api/users/", { withCredentials: true })
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

    const handleLogOutClick = () => {
        axios
            .get("http://localhost:8000/api/users/logout", {
                withCredentials: true,
            })
            .then((res) => {
                console.log("Logged out!");
                socket.disconnect();
                localStorage.clear();
                // window.location.reload(false);
                setUser(null);
                // res.cookie.clear();
                alert(`Logging ${user.screenName} out. Bye!`);
                navigate("/");
                window.location.reload(); //Help users sign in and out without closing windows.
            });
        play(WindowsXpShutDown);
    };
    return (
        <>
            <div className="Home">
                <div className="flex justify-center  ">
                    <nav className="flex flex-col m-2 shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg fill-indigo-400 border-2 bg-blue-400">
                        <div className=" flex flex-row">
                            <Boop rotation={"5"} timing={"100"}>
                                <img
                                    src={aolemoji}
                                    className=" h-20 w-25"
                                    alt="aolemoji"
                                />
                            </Boop>
                            <div className="flex flex-row justify-center">
                                <h1 className="flex text-4xl items-center font-extrabold text-white dark:text-white">
                                    <Boop rotation={"3"} timing={"100"}>
                                        SAIM - MESSENGER 👋
                                    </Boop>
                                </h1>
                            </div>
                            <mark className="flex flex-row justify-center m-4 p-6 bg-blue-800 rounded-xl shadow-lg h-20 w-54">
                                <div className="flex flex-row justify-center items-center w-54 p-4 pb-4">
                                    <h1
                                        style={{ fontSize: "1.5rem" }}
                                        className=" text-xl flex justify-center items-center font-extrabold text-white dark:text-white "
                                    >
                                        @ {user.screenName}
                                    </h1>
                                    <div>
                                        <Boop rotation={"15"} timing={"100"}>
                                            <img
                                                src={aolemoji}
                                                alt="aolemoji"
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                }}
                                                className=""
                                            />
                                        </Boop>
                                    </div>
                                </div>
                            </mark>
                        </div>
                        <div className="text-center">
                            <p className=" text-gray-900 md:text-lg dark:text-gray-900">
                                A space where millennials can chat and share
                                their hilarious away messages
                            </p>
                        </div>
                    </nav>{" "}
                </div>
                <div className="flex justify-center m-4">
                    <div>
                        <div className=" flex flex-col p-2 m-10 bg-gray-300 rounded-lg shadow-2xl hover:bg-gray-100  dark:border-gray-700 mt-2">
                            <div className="border-2  flex flex-col h-52 w-96 border-black rounded-lg bg-blue-700">
                                <p className="p-2 font-extrabold tracking-tighter text-white text-3xl -mt-30">
                                    SAIM - MESSENGER
                                </p>
                                <div className="flex justify-center flex-row">
                                    <p className="font-extrabold text-3xl">"</p>
                                    <div className="-mt-12">
                                        <Boop
                                            rotation={"20"}
                                            duration={"200"}
                                            className=""
                                        >
                                            <img
                                                src={aolemoji}
                                                alt="aolemoji"
                                                className="h-50 w-50"
                                            />
                                        </Boop>
                                    </div>
                                    <p className="font-extrabold text-6xl">"</p>
                                </div>
                            </div>
                            <div className="text-left">
                                <h1 className="text-3xl font-extrabold m-4 text-black">
                                    Buddies:
                                </h1>
                                <UserModal
                                    className=""
                                    userScreenName={user.screenName}
                                    userEmail={user.email}
                                />
                            </div>
                            <div className="flex flex-row items-center m-4 justify-between">
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
                                            onClick={() => handleLogOutClick()}
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
                                <hr />
                            </div>
                            <div className="flex flex-col text-center items-center justify-center">
                                <button
                                    className="px-4 py-2 text-blue-900 100rounded-md hover:underline text-center"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    Creator of SAIM - Messenger
                                </button>

                                {showModal && (
                                    <CreatorModal setOpenModal={setShowModal} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="border-2 border-gray-200 rounded-xl bg-gray-200"
                        style={{ width: "auto", height: "600px" }}
                    >
                        <div className="m-2 border-2 border-black h-14 from-b rounded-xl bg-gradient-to-r from-blue-500 to-blue-400">
                            <p className="text-white font-bold m-4 text-2xl">
                                {" "}
                                Instant Message
                            </p>
                        </div>
                        <div
                            className="border-2 m-2 border-black rounded-xl bg-white"
                            style={{ height: "500px" }}
                        >
                            <CreateRoom />
                            <Lobby />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
