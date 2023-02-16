import React, {useEffect, useState, useContext} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import logo1 from "../images/logo1.png";
import Chat from "./Chat";
import windowsXp from "../images/windowsXp.jpeg";
import { Badge, Card } from "flowbite-react";
import man from "../images/aolemoji.png";
import {ReactSession} from 'react-client-session';
import { UserContext } from "../context/UserContext";
import axios from 'axios';
const LoginPage = (props) => {
    const {setUser} = useContext(UserContext);
    const {register, login} = state;

  const navigate = useNavigate();
    const {formState: { errors } } = useForm();
    // const name = localStorage.getItem("screenName");
    const [state, setState] = useState({
        // register: {
        //     screenName: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: ""
        // },
        login: {
            email: "",
            password: ""
        }
    })
//*Registration
    const handleRegInputs = (e) => {
        props.setAuthorized("");
        setState({...state, register: {...state.register,[e.target.name]: e.target.value}})    
        
    }
    const handleRegistration = (e) => {
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/register", register, {withCredentials: true})
            .then(res => {
                console.log(res)
                setUser({
                    id: res.data.user.id,
                    username: res.data.user.username,
                    room: ""
                })
                navigate("/users")

            })
            .catch(err => console.log(err))
    }

    //LOGIN 
        const handleLoginInputs = (e) => {
        props.setAuthorized("");
        setState({...state, login: {...state.login, [e.target.name]: e.target.value}})
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", login, {withCredentials:true})
            .then(res => {
                console.log(res)
                setUser({
                    id: res.data.userInfo.id,
                    username: res.data.userInfo.username,
                    room: ""
                })
                navigate("/users")
            })
            .catch(err => console.log(err))
    }
////////////////////////////////////////////////////////////////////////////////////////////////


  const onSubmit = (data) => {
    console.log(data);
    const userData = JSON.parse(localStorage.getItem(data.email));
    console.log("printing:",data);
    // <Chat currentUser={userData.name}/>
    if (userData) {
    if (userData.password === data.password) {
        if (!localStorage.getItem('loggedIn')) {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('email', data.email);
            console.log( + " You Are Successfully Logged In");
            alert(`Thanks for logging in ${data["screenName"]}`);

        } 
        // else {
            navigate("/chat");
        //     console.log('You are already logged in');
        //     alert("Strange...look's like you are already logged in.  For security purposes, please log in again!")
        //     localStorage.removeItem('loggedIn');
        //     navigate("/");
        // }
    } 
    else {
        console.log("Email or Password is not matching with our record");
        alert("Email or Password is not matching with our record")
    }
    } else {
        console.log("Email or Password is not matching with our record");
        alert("Email or Password is not matching with our record");
    }
    };

    return (
        <>
            <div>
                <nav className=" whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-2.5 rounded-sm shadow-lg fill-indigo-400border-2 bg-blue-400">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <div className="flex items-center">
                            <img
                                src={man}
                                className=" h-20 w-25"
                                alt="Flowbite Logo"
                            />
                            <h1 className="text-4xl font-extrabold text-white dark:text-white">
                                SAIM - MESSENGER 👋
                            </h1>
                        </div>
                        <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-400">
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
                <span className=" block max-w-xs max-h-sm p-2 scale-90 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 mt-2 m-auto">
                    <img src={logo1} style={{}} alt="logo1" />
                    <hr />

                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-slate-700">
                                    screenName!
                                </span>
                                {errors.screenName && (
                                    <span style={{ color: "red" }}>
                                        *ScreenName* is mandatory{" "}
                                    </span>
                                )}
                                <input
                                    {...register("screenName", {
                                        required: true,
                                    })}
                                    type="text"
                                    name="screenName"
                                    className="mt-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    placeholder="screenName"
                                />
                                <label>
                                    <Link
                                        className="text-indigo-500 text-xs hover:underline"
                                        to="/register"
                                    >
                                        Get a ScreenName
                                    </Link>
                                </label>
                            </label>
                        </div>

                        <div className="mb-6 mt-0">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-slate-700">
                                    eMail!
                                </span>
                                {errors.email && (
                                    <span style={{ color: "red" }}>
                                        *Email* is mandatory{" "}
                                    </span>
                                )}
                                <input
                                    {...register("email", { required: true })}
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
                                {errors.password && (
                                    <span style={{ color: "red" }}>
                                        *Password* is mandatory{" "}
                                    </span>
                                )}
                                <input
                                    {...register("password", {
                                        required: true,
                                    })}
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
export default LoginPage;
