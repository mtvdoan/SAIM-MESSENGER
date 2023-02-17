import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo1 from "../images/logo1.png";
import Chat from "./Chat";
import man from "../images/aolemoji.png";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import App from '../App'
import io from 'socket.io-client';
const Login = (props) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    // const name = localStorage.getItem("screenName");
    const [state, setState] = useState({
        // register: {
        //     screenName: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        // },
        login: {
            email: "",
            password: "",
        },
    });
    const [errors, setErrors] = useState([]);
    const { login } = state;

    // //*Registration
    // const handleRegInputs = (e) => {
    //     props.setAuthorized("");
    //     setState({
    //         ...state,
    //         register: { ...state.register, [e.target.name]: e.target.value },
    //     });
    // };
// const handleRegistration = (e) => {
//     e.preventDefault();

//     axios
//         .post("http://localhost:8000/api/users/register", register, {
//             withCredentials: true,
//         })
//         .then((res) => {
//             console.log(res);
//             setUser({
//                 id: res.data.user.id,
//                 screenName: res.data.user.screenName,
//                 // room: "",
//             });
//             navigate("/users");
//         })
//         .catch((err) => console.log(err));

//     // Clear errors
//     setErrors([]);
// };

    //LOGIN
    const handleLoginInputs = (e) => {
        props.setAuthorized("");
        setState({
            ...state,
            login: { ...state.login, [e.target.name]: e.target.value },
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const errorArr=[];
        axios
            .post("http://localhost:8000/api/users/login", login, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                setUser({
                    id: res.data.userInfo.id,
                    screenName: res.data.userInfo.screenName,
                    // room: ""
                });
                console.log("User has been successfully logged in");
                navigate("/chat");
            })
            .catch((err) => {
                
                console.log("is it even catching an error?", err);
                const errorResponse = err.response.data; // Get the errors from err.response.data
 // Define a temp error array to push the messages in
                    console.log("errorArr", errorArr);
                    console.log("errorResponse", errorResponse)
                errorArr.push("Ooops, something went wrong with logging in.  Try again!")
                // for (const key of Object.keys(errorResponse)) {
                //     console.log("printingkeys", key)
                //     console.log("errorResponse", errorResponse)
                //     console.log("printingkeys objectkeys", Object.keys)
                //     // Loop through all errors and get the messages
                //     errorArr.push(errorResponse[key].message);
                //     console.log("tell me the key", key);
                //     console.log("printing errors object errorResponse[key]", errorResponse[key].message)
                // }
                // Set Errors
                setErrors(errorArr);

                console.log("what is my error arr?", errorArr)
            });
    };

    return (
        <>
            <div className="">
                <nav className=" whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-2.5 rounded-sm shadow-lg fill-indigo-400border-2 bg-blue-400">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <div className="flex items-center">
                            <img
                                src={man}
                                className=" h-20 w-25"
                                alt="Flowbite Logo"
                            />
                            <h1 className="text-4xl content-centerfont-extrabold text-white dark:text-white">
                                SAIM - MESSENGER 👋
                            </h1>
                        </div>
                        <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-900">
                            A space where millennials can chat and share their
                            hilarious away messages
                        </p>
                        <div
                            className="hidden w-full md:block md:w-auto"
                            id="navbar-default"
                        ></div>
                    </div>
                </nav>
            </div>
            <div className="items-center flexm-2">
                <span className=" block max-w-xs max-h-sm p-2 scale-90 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 mt-2 m-auto">
                    <img src={logo1} style={{}} alt="logo1" />
                    <hr />
                    <form onSubmit={handleLogin}>
                        {errors.length > 0 &&
                            errors.map((error, i) => (
                                <>
                                    <p className=" text-red-600" key={i}>
                                        {error}
                                    </p>
                                </>
                            ))}
                        <div className="mb-6 mt-0">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-slate-700">
                                    eMail!
                                </span>
                                <input
                                    onChange={handleLoginInputs}
                                    type="email"
                                    name="email"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    placeholder="you@example.com"
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                    PaSsWoRd:
                                </span>
                                <input
                                    onChange={handleLoginInputs}
                                    type="text"
                                    name="password"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    placeholder="Enter Your Password"
                                />
                            </label>
                        </div>
                        <button type="submit" className="m-8 flex">
                            <a
                                href="#_"
                                className="relative px-6 py-3 font-bold text-black group"
                                type="submit"
                            >
                                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-blue-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                                <span className="relative">Sign On</span>
                            </a>
                        </button>
                        <hr />
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            © 2023{" "}
                            <a
                                href="https://flowbite.com/"
                                className="hover:underline"
                            >
                                SAIM MESSENGER™
                            </a>
                            . All Rights Reserved.{" "}
                        </span>
                    </form>
                </span>
            </div>
        </>
    );
};

export default Login;
