import React from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate, Link} from 'react-router-dom';
import logo1 from "../images/logo1.png"
import Chat from "./Chat";

const LoginPage = (props) => {
    // const name = JSON.parse(localStorage.getItem(data.screenName));
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
    // const name = localStorage.getItem("screenName");
  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    console.log(userData.screenName);
    <Chat currentUser={userData.name}/>
    if (userData) {
    if (userData.password === data.password) {
        if (!localStorage.getItem('loggedIn')) {
            localStorage.setItem('loggedIn', true);

            console.log( + " You Are Successfully Logged In");
            alert(`Thanks for logging in ${userData.screenName}`);
            navigate("/chat");

        } 
        else {
            console.log('You are already logged in');
            alert("Strange...look's like you are already logged in.  For security purposes, please log in again!")
            localStorage.removeItem('loggedIn');
            navigate("/");
        }
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
        
            <nav className=" bg-blue m-auto px-2 sm:px-4  dark: bg-blue-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto scale-75">
                    <div className="center fluid">
                        <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl text-center dark:text-white">Welcome!</h1>
                    </div>
                </div>
                <p className="scale-75 mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">A space for millennials to chat and share hilarious away messages!</p>
            </nav>          
            <div className="scale-75 fluid big-white rounded-lg p-10  mt-20 shadow-xl max-w-md m-auto justify-evenly">
                <img src={logo1} alt="logo"/>
                <div className="">
                    <form className="text-stone-900" onSubmit={handleSubmit(onSubmit)} >
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                eMail!
                            </span>
                            {errors.email && <span style={{ color: "red" }}>
                            *Email* is mandatory </span>}
                            <input {...register("email", { required: true })}   type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                        </label>
                        <label className="block">
                            <a href path="/register" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Get a ScreenName</a>

                        </label>
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                PaSsWoRd:
                            </span>
                            {errors.password && <span style={{ color: "red" }}>
                            *Password* is mandatory </span>}
                            <input {...register("password", {required: true})} type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Your Password" />
                        </label>
                        <div className="p-2">

                            <button type={"submit"} className="p-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign On</button>
                        </div>
                    </form>
                </div>
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">SAIM MESSENGER™</a>. All Rights Reserved.  </span>
            </div>
        </>
    );
}
// Login.defaultProps = {
//     name: "screenName"
// }
export default LoginPage